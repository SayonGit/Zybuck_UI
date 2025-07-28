import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DestinationCard from "./DestinationCard";
import { useAppData } from "../../hooks/useAppData";

type TabType = "popular" | "cities" | "countries" | "regions" | "airports";

const PopularDestinationsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("popular");
  const [currentPage, setCurrentPage] = useState(0);

  // Get popular destinations from Redux store
  const { popularDestinations } = useAppData();

  // Filter destinations based on active tab
  const filteredDestinations = popularDestinations.filter(
    (dest: any) => dest.category === activeTab
  );

  // 9 cards per page (3x3 grid)
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  // Get current page destinations
  const currentDestinations = filteredDestinations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(0); // Reset to first page when changing tabs
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const tabLabels = {
    popular: "Popular routes",
    cities: "Cities",
    countries: "Countries",
    regions: "Regions",
    airports: "Airports",
  };

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="w-full px-4 sm:px-0 lg:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Plan your perfect trip
            </h2>
            <p className="text-gray-600">
              Search Flights & Places Hire to our most popular destinations
            </p>
          </div>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700 hover:underline self-start sm:self-center">
            See more places
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div className="flex p-1 overflow-x-auto">
            {Object.entries(tabLabels).map(([key, label]) => (
              <button
                key={key}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === key
                    ? "border border-blue-600 text-blue-600 rounded-full shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleTabChange(key as TabType)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 3x3 Grid Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200"
                onClick={goToPrevPage}
              >
                <Icon
                  icon="heroicons:chevron-left-20-solid"
                  className="w-5 h-5"
                />
              </button>

              <button
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200"
                onClick={goToNextPage}
              >
                <Icon
                  icon="heroicons:chevron-right-20-solid"
                  className="w-5 h-5"
                />
              </button>
            </>
          )}

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {currentDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}

            {/* Fill empty slots if less than 9 items */}
            {currentDestinations.length < itemsPerPage &&
              Array.from({
                length: itemsPerPage - currentDestinations.length,
              }).map((_, index) => (
                <div key={`empty-${index}`} className="invisible">
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg"></div>
                </div>
              ))}
          </div>

          {/* Page Indicators */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
                  }`}
                  onClick={() => goToPage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile See More Button */}
        <div className="text-center mt-6 sm:hidden">
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700 hover:underline">
            See more places
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsGrid;
