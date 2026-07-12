/**
 * Geocoding utilities using OpenStreetMap Nominatim API (free, no API key required).
 * For production with heavy traffic, consider switching to Google Maps or Mapbox.
 *
 * Nominatim usage policy: max 1 request/second, include a User-Agent.
 * https://operations.osmfoundation.org/policies/nominatim/
 */

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const USER_AGENT = "PawsitiveAdopting/1.0";

export type GeocodingResult = {
  city: string;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
  displayName: string;
};

export type LocationSuggestion = {
  placeId: string;
  displayName: string;
  city: string;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
};

type NominatimSearchItem = {
  place_id: number;
  display_name: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
  lat: string;
  lon: string;
};

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function buildLocationLabel(city: string, state: string | null, country: string, fallback: string): string {
  const parts = [city, state, country].filter(Boolean);
  if (parts.length === 0) {
    return fallback;
  }

  return parts.join(", ");
}

function buildSuggestionKey(suggestion: Pick<LocationSuggestion, "city" | "state" | "country">): string {
  return [suggestion.city, suggestion.state ?? "", suggestion.country]
    .map(normalizeText)
    .join("|");
}

/**
 * Forward geocode: convert a place name/address to coordinates.
 */
export async function geocodeAddress(
  query: string,
): Promise<GeocodingResult | null> {
  try {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      addressdetails: "1",
      limit: "1",
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data || data.length === 0) return null;

    const result = data[0];
    const address = result.address || {};

    return {
      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "",
      state: address.state || null,
      country: address.country_code?.toUpperCase() || "",
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      displayName: result.display_name,
    };
  } catch {
    console.error("Geocoding failed for query:", query);
    return null;
  }
}

function mapSearchItem(item: NominatimSearchItem): LocationSuggestion {
  const address = item.address || {};
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    "";
  const state = address.state || null;
  const countryCode = address.country_code?.toUpperCase() || "";
  const countryLabel = address.country || countryCode;

  return {
    placeId: String(item.place_id),
    displayName: buildLocationLabel(city, state, countryLabel, item.display_name),
    city,
    state,
    country: countryCode,
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon),
  };
}

/**
 * Search for location suggestions (for autocomplete).
 */
export async function searchLocations(
  query: string,
  limit = 5,
): Promise<LocationSuggestion[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      addressdetails: "1",
      limit: String(limit),
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as NominatimSearchItem[];
    const uniqueSuggestions = new Map<string, LocationSuggestion>();

    for (const item of data) {
      const suggestion = mapSearchItem(item);
      const key = buildSuggestionKey(suggestion);

      if (!uniqueSuggestions.has(key)) {
        uniqueSuggestions.set(key, suggestion);
      }

      if (uniqueSuggestions.size >= limit) {
        break;
      }
    }

    return Array.from(uniqueSuggestions.values());
  } catch {
    console.error("Location search failed for query:", query);
    return [];
  }
}

/**
 * Calculate distance between two points using the Haversine formula.
 * Returns distance in kilometers.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Convert km to miles.
 */
export function kmToMiles(km: number): number {
  return km * 0.621371;
}

/**
 * Convert miles to km.
 */
export function milesToKm(miles: number): number {
  return miles * 1.60934;
}
