"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, X, Loader2 } from "lucide-react";
import { Input } from "@pawsitiveadopting/ui/components/input";
import { Button } from "@pawsitiveadopting/ui/components/button";
import { useTranslations } from "next-intl";

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
  value: string;
  onLocationSelect: (location: {
    name: string;
    lat: number;
    lng: number;
  }) => void;
  onClear: () => void;
};

export default function LocationSearch({
  value,
  onLocationSelect,
  onClear,
}: Props) {
  const t = useTranslations('Pets.Filters.location');
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Update local state when prop changes
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // Close dropdown when clicking outside
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

    // Debounce API calls (300ms)
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
    setShowDropdown(false);
    onLocationSelect({
      name: displayName || suggestion.displayName,
      lat: suggestion.latitude,
      lng: suggestion.longitude,
    });
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    onClear();
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-1">
        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium">{t('title')}</span>
      </div>
      <div className="relative mt-2">
        <Input
          type="text"
          placeholder={t('placeholder')}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          className="pr-8 text-sm"
        />
        {isLoading && (
          <Loader2 className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={handleClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li key={suggestion.placeId}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-start gap-2"
                onClick={() => handleSelect(suggestion)}
              >
                <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground shrink-0" />
                <span className="line-clamp-2">
                  {suggestion.displayName}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
