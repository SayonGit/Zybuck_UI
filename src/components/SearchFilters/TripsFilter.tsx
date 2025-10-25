// components/SearchFilters/TripsFilter.tsx
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "react-router-dom";

export const TripsFilter = () => {
  const [searchParams] = useSearchParams();
  const returnDate = searchParams.get("returnDate")?.toString() || "";
  const [selectedTrip, setSelectedTrip] = useState<string>(
    returnDate ? "roundtrip" : "oneway"
  );

  const tripOptions = [
    { id: "oneway", label: "One way", icon: "heroicons:arrow-right" },
    { id: "roundtrip", label: "Round trip", icon: "heroicons:arrow-path" },
    { id: "multicity", label: "Multi-city", icon: "heroicons:map" },
  ];

  return (
    <div className="space-y-2">
      {tripOptions.map((option) => (
        <label key={option.id} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="trip-type"
            value={option.id}
            checked={selectedTrip === option.id}
            onChange={(e) => setSelectedTrip(e.target.value)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
          <Icon icon={option.icon} className="w-4 h-4 ml-2 text-gray-500" />
          <span className="ml-2 text-xs sm:text-sm text-gray-700">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};
