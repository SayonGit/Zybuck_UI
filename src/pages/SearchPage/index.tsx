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
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "@/store/slices/flightSearchSlice";

export type SortKey = "recommended" | "cheapest" | "quickest" | "best";

const SearchPage = () => {
  const dispatch = useDispatch();
  const storedFlights = useSelector(
    (state: any) => state.flightSearch.searchResults
  );

  const { data, loading: isLoading, fetchFlightOffers } = useFlightOffers();
  const [searchParams] = useSearchParams();

  const [searchType, setSearchType] = useState<string>("flight");
  const [sortBy, setSortBy] = useState<SortKey>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStop, setSelectedStop] = useState<string>("all");
  const [departureRange, setDepartureRange] = useState<[number, number]>([
    0, 24,
  ]);
  const [arrivalRange, setArrivalRange] = useState<[number, number]>([0, 24]);
  const [flightResult, setFlightResult] = useState<Flight[]>([]);

  const [transformed, setTransformed] = useState<{
    recommended: Flight[];
    cheapest: Flight[];
    quickest: Flight[];
    best: Flight[];
  }>({
    recommended: [],
    cheapest: [],
    quickest: [],
    best: [],
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const transformedData = transformFlightOffers(data);
      setTransformed(transformedData);
      dispatch(setSearchResults(transformedData));
      setFlightResult(transformedData[sortBy] ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (storedFlights && Object.keys(storedFlights).length > 0) {
      setTransformed(storedFlights);
      setFlightResult(storedFlights[sortBy] ?? []);
    }
  }, [storedFlights, sortBy]);

  useEffect(() => {
    const fromParam = searchParams.get("from") || "";
    const toParam = searchParams.get("to") || "";
    const departDate = searchParams.get("departDate") || "";
    const returnDate = searchParams.get("returnDate") || "";
    const adultsCnt = searchParams.get("adults") || "1";
    const children = searchParams.get("children") || "0";
    const infants = searchParams.get("infants") || "0";
    const travelClass = searchParams.get("class") || "ECONOMY";

    const fromCode = fromParam.match(/\(([^)]+)\)/)?.[1] || "";
    const toCode = toParam.match(/\(([^)]+)\)/)?.[1] || "";

    setSearchType(getSearchTypeFromParams(searchParams));

    fetchFlightOffers({
      fromCode,
      toCode,
      departureDate: departDate,
      returnDate,
      adultsCnt: parseInt(adultsCnt),
      class: travelClass.toUpperCase(),
      children: parseInt(children),
      infants: parseInt(infants),
    });
  }, [searchParams]);

  useEffect(() => {
    const baseFlights = transformed[sortBy] ?? [];

    const filtered = baseFlights.filter((flight) => {
      const stops = Number(flight.stops ?? 0);

      // --- Stop Filter ---
      if (selectedStop === "direct" && stops !== 0) return false;
      if (selectedStop === "oneStop" && stops !== 1) return false;

      // --- Airline Filter ---
      if (
        selectedAirlines.length > 0 &&
        !selectedAirlines.includes(flight.airline)
      )
        return false;

      // --- Departure Time Filter ---
      const depHour = new Date(flight.travelDate).getHours();
      if (depHour < departureRange[0] || depHour > departureRange[1])
        return false;

      // --- Arrival Time Filter ---
      const arrHour = new Date(flight.arrivalDate).getHours();
      if (arrHour < arrivalRange[0] || arrHour > arrivalRange[1]) return false;

      return true;
    });

    setFlightResult(filtered);
  }, [
    sortBy,
    selectedStop,
    selectedAirlines,
    departureRange,
    arrivalRange,
    transformed,
  ]);

  // Handlers
  const handleStopSelection = (stopType: string) => setSelectedStop(stopType);
  const handleDepartureFilter = (range: [number, number]) =>
    setDepartureRange(range);
  const handleArrivalFilter = (range: [number, number]) =>
    setArrivalRange(range);
  const handleAirlineSelection = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  return (
    <div>
      {/* Search Summary Form */}
      <SearchSummary searchType={searchType} />

      {/* Mobile Filter Toggle */}
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

      {/* Mobile Filters Drawer */}
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

      {/* Main Layout */}
      <div className="grid lg:grid-cols-4 gap-6 mt-6">
        {/* Desktop Filters */}
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

        {/* Results */}
        <div className="col-span-full lg:col-span-3">
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
