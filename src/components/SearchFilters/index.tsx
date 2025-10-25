// components/SearchFilters.tsx
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react";
import { FilterSection } from "./FilterSection";
import { TripsFilter } from "./TripsFilter";
import { AirportsFilter } from "./AirportsFilter";
import { FlightNumberFilter } from "./FlightNumberFilter";
import { FAQsFilter } from "./FAQsFilter";
import styles from "./index.module.scss";
import type { AirlineNamedLogo } from "@/staticData/currencySigns";
import { useSearchParams } from "react-router-dom";

interface SearchFiltersProps {
  searchType: string;
  airlines?: AirlineNamedLogo[];
  selectedAirlines?: string[];
  setSelectedAirlines?: Dispatch<SetStateAction<string[]>>;
}

export const SearchFilters = ({
  airlines,
  selectedAirlines,
  setSelectedAirlines,
}: SearchFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    stops: true,
    route: false,
    departure: true,
    arrival: true,
    airlines: true,
    trips: false,
    airports: false,
    flightNumber: false,
    faqs: false,
  });

  // Filter states
  const [selectedStop, setSelectedStop] = useState<string>("all");
  const [departureRange, setDepartureRange] = useState<[number, number]>([
    0, 24,
  ]);
  const [arrivalRange, setArrivalRange] = useState<[number, number]>([0, 24]);
  const [searchParams] = useSearchParams();
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleStopSelection = (stopType: string) => {
    setSelectedStop(stopType);
  };

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines!((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return "12:01am";
    if (hour === 24) return "11:59pm";
    if (hour < 12) return `${hour}:00am`;
    if (hour === 12) return "12:00pm";
    return `${hour - 12}:00pm`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
          Filters
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {/* 1. Stops Filter */}
        <FilterSection
          title="Stops"
          isExpanded={expandedSections.stops}
          onToggle={() => toggleSection("stops")}
        >
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => handleStopSelection("all")}
                className={`flex-1 px-2 sm:px-3 py-2 text-xs border rounded transition-colors ${
                  selectedStop === "all"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                All Flights
              </button>
              <button
                onClick={() => handleStopSelection("direct")}
                className={`flex-1 px-2 sm:px-3 py-2 text-xs border rounded transition-colors ${
                  selectedStop === "direct"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Direct Flight
              </button>
              <button
                onClick={() => handleStopSelection("oneStop")}
                className={`flex-1 px-2 sm:px-3 py-2 text-xs border rounded transition-colors ${
                  selectedStop === "oneStop"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Up to 1 Stop
              </button>
            </div>
          </div>
        </FilterSection>

        {/* 2. Route Filter */}
        <FilterSection
          title={
            searchParams.get("from") && searchParams.get("to")
              ? `${searchParams.get("from")} → ${searchParams.get("to")}`
              : "Route"
          }
          isExpanded={expandedSections.route}
          onToggle={() => toggleSection("route")}
        >
          <div className="text-xs text-gray-500">
            Route information and options will appear here.
          </div>
        </FilterSection>

        <FilterSection
          title="Departure"
          isExpanded={expandedSections.departure}
          onToggle={() => toggleSection("departure")}
        >
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>{formatTime(departureRange[0])}</span>
            <span>{formatTime(departureRange[1])}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="24"
              value={departureRange[0]}
              onChange={(e) =>
                setDepartureRange([parseInt(e.target.value), departureRange[1]])
              }
              className={`absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer ${styles.rangeSlider}`}
              style={{ zIndex: 1 }} // Lower z-index for left slider
            />
            <input
              type="range"
              min="0"
              max="24"
              value={departureRange[1]}
              onChange={(e) =>
                setDepartureRange([departureRange[0], parseInt(e.target.value)])
              }
              className={`absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer ${styles.rangeSlider}`}
              style={{ zIndex: 2 }} // Higher z-index for right slider
            />
            <div className="relative h-2 bg-gray-200 rounded-lg">
              <div
                className="absolute h-full bg-blue-600 rounded-lg"
                style={{
                  left: `${(departureRange[0] / 24) * 100}%`,
                  width: `${
                    ((departureRange[1] - departureRange[0]) / 24) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </FilterSection>

        {/* 4. Arrival Time */}
        <FilterSection
          title="Arrival"
          isExpanded={expandedSections.arrival}
          onToggle={() => toggleSection("arrival")}
        >
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>{formatTime(arrivalRange[0])}</span>
            <span>{formatTime(arrivalRange[1])}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="24"
              value={arrivalRange[0]}
              onChange={(e) =>
                setArrivalRange([parseInt(e.target.value), arrivalRange[1]])
              }
              className={`absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer ${styles.rangeSlider}`}
              style={{ zIndex: 1 }} // Lower z-index for left slider
            />
            <input
              type="range"
              min="0"
              max="24"
              value={arrivalRange[1]}
              onChange={(e) =>
                setArrivalRange([arrivalRange[0], parseInt(e.target.value)])
              }
              className={`absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer ${styles.rangeSlider}`}
              style={{ zIndex: 2 }} // Higher z-index for right slider
            />
            <div className="relative h-2 bg-gray-200 rounded-lg">
              <div
                className="absolute h-full bg-blue-600 rounded-lg"
                style={{
                  left: `${(arrivalRange[0] / 24) * 100}%`,
                  width: `${((arrivalRange[1] - arrivalRange[0]) / 24) * 100}%`,
                }}
              />
            </div>
          </div>
        </FilterSection>

        {/* 5. Airlines Filter */}
        <FilterSection
          title="Airlines"
          isExpanded={expandedSections.airlines}
          onToggle={() => toggleSection("airlines")}
        >
          <div className="space-y-2">
            {airlines!.map((airline) => (
              <label
                key={airline.iata}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedAirlines!.includes(airline.iata)}
                  onChange={() => handleAirlineToggle(airline.iata)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700">
                  {airline.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 6. Trips Filter */}
        {/* <FilterSection
          title="Trips"
          isExpanded={expandedSections.trips}
          onToggle={() => toggleSection("trips")}
        >
          <TripsFilter />
        </FilterSection> */}

        {/* 7. Airports Filter */}
        {/* <FilterSection
          title="Airports"
          isExpanded={expandedSections.airports}
          onToggle={() => toggleSection("airports")}
        >
          <AirportsFilter />
        </FilterSection> */}

        {/* 8. Flight Number Filter */}
        {/* <FilterSection
          title="Flight Number"
          isExpanded={expandedSections.flightNumber}
          onToggle={() => toggleSection("flightNumber")}
        >
          <FlightNumberFilter />
        </FilterSection> */}

        {/* 9. FAQs Filter */}
        <FilterSection
          title="FAQs"
          isExpanded={expandedSections.faqs}
          onToggle={() => toggleSection("faqs")}
        >
          <FAQsFilter />
        </FilterSection>

        {/* Clear Filters Button */}
        <div className="p-3 sm:p-4">
          <button
            onClick={() => {
              setSelectedStop("all");
              setDepartureRange([0, 24]);
              setArrivalRange([0, 24]);
              setSelectedAirlines!([]);
            }}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Icon icon="heroicons:arrow-path" className="w-4 h-4 inline mr-2" />
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};
