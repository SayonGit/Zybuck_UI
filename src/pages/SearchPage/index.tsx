import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SkeletonSearchResults,
  SkeletonFilter,
} from "../../components/common/Skeleton";
import { getSearchTypeFromParams } from "../../utils/searchUtils";
import { SearchSummary } from "../../components/SearchSummary";
import { SortingTabs } from "../../components/SortingTabs";
import { SearchResults } from "../../components/SearchResult";
import { SearchFilters } from "../../components/SearchFilters";
import { Icon } from "@iconify/react";
import useFlightOffers from "./useFlightSearch";
import { getAllAirlines, transformFlightOffers } from "./transformFlightOffers";
import type { Flight } from "@/types";

export type SortKey = "recommended" | "cheapest" | "quickest" | "best";

const SearchPage = () => {
  const { data, loading: isLoading, fetchFlightOffers } = useFlightOffers();
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<string>("flight");
  const [sortBy, setSortBy] = useState<SortKey>("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStop, setSelectedStop] = useState<string>("all");
  const [flightResult, setFlightResult] = useState<Flight[]>([]);
  const [arrivalRange, setArrivalRange] = useState<[number, number]>([0, 24]);
  const [departureRange, setDepartureRange] = useState<[number, number]>([
    0, 24,
  ]);

  const transformed = transformFlightOffers(data) as {
    recommended: Flight[];
    cheapest: Flight[];
    quickest: Flight[];
    best: Flight[];
  };

  useEffect(() => {
    console.log(transformed[sortBy]);
    setFlightResult(transformed[sortBy] ?? []);
  }, [sortBy, data]);

  useEffect(() => {
    setSearchType(getSearchTypeFromParams(searchParams));
    const fromParam = searchParams.get("from")?.toString() || "";
    const toParam = searchParams.get("to")?.toString() || "";
    const departureDate = searchParams.get("departDate")?.toString() || "";
    const returnDate = searchParams.get("returnDate")?.toString() || "";
    const adultsCnt = searchParams.get("adults")?.toString() || "";
    const children = searchParams.get("children")?.toString() || "";
    const infants = searchParams.get("infants")?.toString() || "";
    const travelClass = searchParams.get("class")?.toString() || "";
    // Extract text inside parentheses (e.g., "CODE")
    const fromCode = fromParam.match(/\(([^)]+)\)/)?.[1] || "";
    const toCode = toParam.match(/\(([^)]+)\)/)?.[1] || "";

    fetchFlightOffers({
      fromCode: fromCode,
      toCode: toCode,
      departureDate: departureDate,
      returnDate: returnDate,
      adultsCnt: adultsCnt ? parseInt(adultsCnt) : 1,
      class: travelClass.toUpperCase() || "ECONOMY",
      children: children ? parseInt(children) : 0,
      infants: infants ? parseInt(infants) : 0,
    });
  }, [searchParams]);

  const handleStopSelection = (stopType: string) => {
    setSelectedStop(stopType);

    const baseFlights = transformed[sortBy] ?? [];

    if (stopType === "direct") {
      setFlightResult(baseFlights.filter((flight) => flight.stops === 0));
    } else if (stopType === "oneStop") {
      setFlightResult(baseFlights.filter((flight) => flight.stops === 1));
    } else {
      setFlightResult(baseFlights);
    }
  };

  const handleDepartureFilter = (range: [number, number]) => {
    setDepartureRange(range);

    const [minHour, maxHour] = range;

    const baseFlights = transformed[sortBy] ?? [];

    const filtered = baseFlights.filter((flight) => {
      const depHour = new Date(flight.travelDate).getHours();
      return depHour >= minHour && depHour <= maxHour;
    });

    setFlightResult(filtered);
  };
  const handleArrivalFilter = (range: [number, number]) => {
    setArrivalRange(range);

    const [minHour, maxHour] = range;

    const baseFlights = transformed[sortBy] ?? [];

    const filtered = baseFlights.filter((flight) => {
      const depHour = new Date(flight.arrivalDate).getHours();
      return depHour >= minHour && depHour <= maxHour;
    });

    setFlightResult(filtered);
  };

  const handleAirlineSelection = (airline: string) => {
    const allAirlines = selectedAirlines.includes(airline)
      ? selectedAirlines.filter((a) => a !== airline)
      : [...selectedAirlines, airline];
    setSelectedAirlines(allAirlines);
    const baseFlights = transformed[sortBy] ?? [];

    if (allAirlines.length === 0) {
      setFlightResult(baseFlights);
      return;
    }

    const filtered = baseFlights.filter((flight) =>
      allAirlines.includes(flight.airline)
    );

    setFlightResult(filtered);
  };

  return (
    <div>
      {/* Search Summary Form */}
      <SearchSummary searchType={searchType} />

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50"
        >
          <span className="flex items-center">
            <Icon icon="heroicons:funnel" className="w-5 h-5 mr-2" />
            Filters
          </span>
          <Icon
            icon={
              showFilters ? "heroicons:chevron-up" : "heroicons:chevron-down"
            }
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Icon icon="heroicons:x-mark" className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto h-full pb-20">
              {isLoading ? (
                <div className="space-y-4 p-4">
                  <SkeletonFilter />
                  <SkeletonFilter />
                  <SkeletonFilter />
                </div>
              ) : (
                <SearchFilters
                  searchType={searchType}
                  airlines={getAllAirlines(data)}
                  selectedAirlines={selectedAirlines}
                  setSelectedAirlines={setSelectedAirlines}
                  handleStopSelection={handleStopSelection}
                  selectedStop={selectedStop}
                  departureRange={departureRange}
                  handleDepartureFilter={handleDepartureFilter}
                  arrivalRange={arrivalRange}
                  handleArrivalFilter={handleArrivalFilter}
                  handleAirlineSelection={handleAirlineSelection}
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-4 gap-6 mt-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          {isLoading ? (
            <div className="space-y-4">
              <SkeletonFilter />
              <SkeletonFilter />
              <SkeletonFilter />
            </div>
          ) : (
            <SearchFilters
              searchType={searchType}
              airlines={getAllAirlines(data)}
              selectedAirlines={selectedAirlines}
              setSelectedAirlines={setSelectedAirlines}
              handleStopSelection={handleStopSelection}
              selectedStop={selectedStop}
              departureRange={departureRange}
              handleDepartureFilter={handleDepartureFilter}
              arrivalRange={arrivalRange}
              handleArrivalFilter={handleArrivalFilter}
              handleAirlineSelection={handleAirlineSelection}
            />
          )}
        </div>

        {/* Results Section */}
        <div className="col-span-full lg:col-span-3">
          {/* Sorting Tabs */}
          <SortingTabs
            sortBy={sortBy}
            setSortBy={setSortBy}
            isLoading={isLoading}
            totalData={flightResult}
            bestData={transformed.best[0]}
            recommendationData={transformed.recommended[0]}
            cheapestData={transformed.cheapest[0]}
            quickestData={transformed.quickest[0]}
          />

          {/* Search Results */}
          {isLoading ? (
            <SkeletonSearchResults />
          ) : (
            <SearchResults
              searchType={searchType}
              sortBy={sortBy}
              searchParams={searchParams}
              flightData={flightResult}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
