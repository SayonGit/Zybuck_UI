import { useState, useEffect } from "react";
import axiosInstance from "@/axiosIntance";
import debounce from "lodash.debounce";

export interface AirportSuggestion {
  city: string;
  airportCode: string;
  airportName: string;
  country: string;
}

export const useAirportSearch = (skipAirport: string) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAirports = debounce(async (term: string) => {
    if (!term || term.length < 2) {
      setError("");
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/v1/reference-data/locations?subType=AIRPORT&keyword=${term}`
      );

      const allSuggestions: AirportSuggestion[] = data?.data?.map(
        (item: any) => ({
          city: item.address.cityName,
          airportCode: item.iataCode,
          airportName: item.name,
          country: item.address.countryName,
        })
      );
      setSuggestions(
        allSuggestions.filter(
          (item) =>
            item.airportCode !== skipAirport.match(/\(([^)]+)\)/)?.[1] || ""
        )
      );
    } catch (err) {
      setError("Failed to fetch airport suggestions.");
      console.error("Airport search failed:", err);
    } finally {
      setLoading(false);
    }
  }, 400);

  useEffect(() => {
    fetchAirports(query);
    return () => fetchAirports.cancel();
  }, [query]);

  return { query, setQuery, suggestions, loading, error };
};
