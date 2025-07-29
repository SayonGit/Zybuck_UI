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

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState<string>("flight");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    setSearchType(getSearchTypeFromParams(searchParams));
  }, [searchParams]);

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
                <SearchFilters searchType={searchType} />
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
            <SearchFilters searchType={searchType} />
          )}
        </div>

        {/* Results Section */}
        <div className="col-span-full lg:col-span-3">
          {/* Sorting Tabs */}
          <SortingTabs
            sortBy={sortBy}
            setSortBy={setSortBy}
            isLoading={isLoading}
          />

          {/* Search Results */}
          {isLoading ? (
            <SkeletonSearchResults />
          ) : (
            <SearchResults
              searchType={searchType}
              sortBy={sortBy}
              searchParams={searchParams}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
