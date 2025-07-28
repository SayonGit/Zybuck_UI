// components/SearchFilters/FlightNumberFilter.tsx
import { useState } from "react";
import { Icon } from "@iconify/react";

export const FlightNumberFilter = () => {
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [recentFlights] = useState<string[]>([
    "AI 131",
    "6E 2141",
    "UK 955",
    "SG 8143",
  ]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter flight number (e.g., AI 131)"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Icon
          icon="heroicons:magnifying-glass"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        />
      </div>

      {recentFlights.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 mb-2">Recent searches:</div>
          <div className="flex flex-wrap gap-1">
            {recentFlights.map((flight) => (
              <button
                key={flight}
                onClick={() => setFlightNumber(flight)}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {flight}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
