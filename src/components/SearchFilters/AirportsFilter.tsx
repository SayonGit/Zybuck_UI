// components/SearchFilters/AirportsFilter.tsx
import { useState } from "react";
import { Icon } from "@iconify/react";

export const AirportsFilter = () => {
  const [selectedAirports, setSelectedAirports] = useState<string[]>([]);

  const airports = [
    {
      code: "DEL",
      name: "Indira Gandhi International Airport",
      city: "New Delhi",
    },
    {
      code: "BOM",
      name: "Chhatrapati Shivaji International Airport",
      city: "Mumbai",
    },
    {
      code: "BLR",
      name: "Kempegowda International Airport",
      city: "Bangalore",
    },
    { code: "MAA", name: "Chennai International Airport", city: "Chennai" },
    {
      code: "CCU",
      name: "Netaji Subhas Chandra Bose International Airport",
      city: "Kolkata",
    },
  ];

  const handleAirportToggle = (airportCode: string) => {
    setSelectedAirports((prev) =>
      prev.includes(airportCode)
        ? prev.filter((a) => a !== airportCode)
        : [...prev, airportCode]
    );
  };

  return (
    <div className="space-y-2">
      {airports.map((airport) => (
        <label key={airport.code} className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={selectedAirports.includes(airport.code)}
            onChange={() => handleAirportToggle(airport.code)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mt-0.5"
          />
          <div className="ml-2">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                {airport.code}
              </span>
              <Icon
                icon="heroicons:building-office"
                className="w-3 h-3 ml-1 text-gray-400"
              />
            </div>
            <div className="text-xs text-gray-500">
              {airport.city} - {airport.name}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};
