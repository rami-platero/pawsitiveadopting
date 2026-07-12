"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@pawsitiveadopting/ui/components/button";
import { useRouter } from "next/navigation";

type LocationSuggestion = {
  placeId: string;
  displayName: string;
  city: string;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
};

type Props = {
  placeholder: string;
  buttonText: string;
};

export default function HeroLocationSearch({ placeholder, buttonText }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/locations/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowDropdown(true);
      }
    } catch {
      console.error("Failed to fetch location suggestions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedLocation(null);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(newQuery);
    }, 300);
  };

  const handleSelect = (suggestion: LocationSuggestion) => {
    const displayName = [suggestion.city, suggestion.state]
      .filter(Boolean)
      .join(", ");
    setQuery(displayName || suggestion.displayName);
    setSelectedLocation(suggestion);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (selectedLocation) {
      const params = new URLSearchParams({
        location: [selectedLocation.city, selectedLocation.state]
          .filter(Boolean)
          .join(", "),
        lat: String(selectedLocation.latitude),
        lng: String(selectedLocation.longitude),
        radius: "50",
      });
      router.push(`/browse?${params.toString()}`);
    } else if (query.trim()) {
      // If user typed something but didn't select, just redirect with text
      router.push(`/browse?location=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/browse");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setShowDropdown(false);
      handleSearch();
    }
  };

  return (
    <div ref={containerRef} className="relative z-10 flex items-center gap-3 pt-7">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          className="w-full rounded-2xl border-2 border-secondary bg-background px-4 py-3 text-base placeholder-secondary pr-30"
        />
        {isLoading && (
          <Loader2 className="absolute right-24 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}

        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute z-50 w-full mt-1 bg-background border rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li key={suggestion.placeId}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-start gap-2"
                  onClick={() => handleSelect(suggestion)}
                >
                  <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                  <span className="line-clamp-2">
                    {suggestion.displayName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        onClick={handleSearch}
        className="rounded-2xl bg-red-300 hover:bg-red-400 text-black font-semibold px-4 sm:px-6 py-3 h-auto text-sm absolute right-1"
      >
        {buttonText}
      </Button>
    </div>
  );
}
