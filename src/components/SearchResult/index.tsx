import type { Flight } from "@/types";
import { FlightResults } from "../FlightResults";

interface SearchResultsProps {
  searchType: string;
  sortBy: string;
  searchParams: URLSearchParams;
  flightData: Flight[] | undefined;
}

export const SearchResults = ({
  searchType,
  sortBy,
  searchParams,
  flightData,
}: SearchResultsProps) => {
  switch (searchType) {
    case "flight":
      return (
        <FlightResults
          sortBy={sortBy}
          searchParams={searchParams}
          flightData={flightData!}
        />
      );
    case "hotel":
      return (
        <div className="bg-white rounded-lg p-3 sm:p-6">
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              Hotel Results Coming Soon
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              We're working hard to bring you the best hotel search experience.
              Stay tuned!
            </p>
          </div>
        </div>
      );
    case "car":
      return (
        <div className="bg-white rounded-lg p-3 sm:p-6">
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              Car Rental Results Coming Soon
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              We're working on bringing you the best car rental options. Check
              back soon!
            </p>
          </div>
        </div>
      );
    default:
      return <FlightResults sortBy={sortBy} searchParams={searchParams} />;
  }
};
