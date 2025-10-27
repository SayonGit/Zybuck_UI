import type { SortKey } from "@/pages/SearchPage";
import type { Flight } from "@/types";
import { Icon } from "@iconify/react";

interface SortingTabsProps {
  sortBy: string;
  setSortBy: (sort: SortKey) => void;
  isLoading: boolean;
  totalData: Flight[];
  bestData: Flight;
  recommendationData: Flight;
  cheapestData: Flight;
  quickestData: Flight;
}

export const SortingTabs = ({
  sortBy,
  setSortBy,
  isLoading,
  totalData,
  bestData,
  recommendationData,
  cheapestData,
  quickestData,
}: SortingTabsProps) => {
  const tabs = [
    {
      id: "recommended",
      label: "Recommended",
      price: recommendationData?.price,
      duration: recommendationData?.duration,
    },
    {
      id: "cheapest",
      label: "Cheapest",
      price: cheapestData?.price,
      duration: cheapestData?.duration,
    },
    {
      id: "best",
      label: "Best",
      price: bestData?.price,
      duration: bestData?.duration,
    },
    {
      id: "quickest",
      label: "Quickest",
      price: quickestData?.price,
      duration: quickestData?.duration,
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex-1 min-w-0 p-2 sm:p-4 text-center">
              <div className="animate-pulse">
                <div className="h-3 sm:h-4 bg-gray-200 rounded mb-1 sm:mb-2"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSortBy(tab.id as SortKey)}
            className={`flex-1 min-w-0 p-2 sm:p-4 text-center transition-colors relative ${
              sortBy === tab.id
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="font-medium text-xs sm:text-sm truncate">
              {tab.label}
            </div>
            <div className="text-xs text-gray-500 mt-1 truncate">
              <span className="hidden sm:inline">
                {tab.price} • {tab.duration}
              </span>
              <span className="sm:hidden">{tab.price}</span>
            </div>
            {sortBy === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="text-xs sm:text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium"> {totalData?.length} result</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-gray-900">
            <span className="hidden sm:inline">Sort by</span>
            <span className="ml-0 sm:ml-1 font-medium">
              {tabs.find((s) => s.id === sortBy)?.label}
            </span>
            {/* <Icon
              icon="heroicons:chevron-down"
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 ml-1"
            /> */}
          </button>
          {/* <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
            Other sort
          </button> */}
        </div>
      </div>
    </div>
  );
};
