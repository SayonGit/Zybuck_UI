import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FlightForm from "../FlightForm";
import "./index.scss";
import { Icon } from "@iconify/react";
import InfiniteScrollImages from "../../InfiniteImageScroll";
import HotelForm from "../HotelForm";
import CarForm from "../CarForm";
import { useAppData } from "../../../hooks/useAppData";

type TabTypes = "flights" | "stay" | "car";

const FormControl: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabTypes>("flights");

  // Get data from Redux store
  const { tabs, scrollingImages } = useAppData();

  // Initialize active tab from URL parameter
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as TabTypes;
    if (tabFromUrl && tabs.some((tab) => tab.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, tabs]);

  // Update URL when tab changes
  const handleTabChange = (tabId: TabTypes) => {
    setActiveTab(tabId);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", tabId);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flight-search-container md:min-h-half-screen">
      <div className="bg-gradient-blue rounded-3xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-8 min-h-[600px]">
          {/* Left Column - Search Form */}
          <div className="xl:col-span-3 p-4 sm:p-6 lg:p-8">
            {/* Title Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Explore top flight deals
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Special offers to suit your plan
              </p>
            </div>

            {/* Navigation Tabs */}
            <div>
              <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <div
                    className="flex flex-col items-center gap-1.5 flex-shrink-0"
                    key={tab.id}
                  >
                    <button
                      className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? "bg-red-400 shadow-sm text-white"
                          : "text-gray-600 bg-white hover:bg-white/50"
                      }`}
                      onClick={() => handleTabChange(tab.id as TabTypes)}
                    >
                      <Icon
                        icon={tab.icon}
                        fontSize={20}
                        className="sm:text-2xl"
                        rotate={tab.rotate}
                      />
                    </button>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                      {tab.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Flight Form */}
              {activeTab === "flights" && <FlightForm />}
              {activeTab === "stay" && <HotelForm />}
              {activeTab === "car" && <CarForm />}
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="xl:col-span-1 hidden xl:block">
            <InfiniteScrollImages
              images={scrollingImages}
              speed={30}
              direction="down"
              className="h-full pr-4 lg:pr-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormControl;
