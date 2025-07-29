import React, { useState } from "react";
import FlightForm from "../FlightForm";
import "./index.scss";
import { Icon } from "@iconify/react";
import InfiniteScrollImages from "../../InfiniteImageScroll";
import HotelForm from "../HotelForm";
import CarForm from "../CarForm";
import { useAppData } from "../../../hooks/useAppData";

type TabTypes = "flights" | "stay" | "car";

const FormControl: React.FC = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabTypes>("flights");

  // Get data from Redux store
  const { tabs, scrollingImages } = useAppData();

  // useEffect(() => {
  //   const tabFromUrl = searchParams.get("tab") as TabTypes;
  //   if (tabFromUrl && tabs.some((tab) => tab.id === tabFromUrl)) {
  //     setActiveTab(tabFromUrl);
  //   }
  // }, [searchParams, tabs]);

  const handleTabChange = (tabId: TabTypes) => {
    // Prevent any default scrolling behavior
    event?.preventDefault();

    setActiveTab(tabId);
    // const newSearchParams = new URLSearchParams(searchParams);
    // newSearchParams.set("tab", tabId);
    // setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <div className="flight-search-container">
      <div className="bg-gradient-blue rounded-3xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-8">
          {/* Left Column - Search Form */}
          <div className="xl:col-span-3 pt-4 pl-5 sm:pl-6 lg:pl-8 sm:pt-6 lg:pt-8 sm:pb-6 flex flex-col gap-8 justify-center">
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
                      // Prevent focus-related scrolling
                      onFocus={(e) => e.preventDefault()}
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

              {/* Forms Container - Prevent auto-focus */}
              <div style={{ scrollMarginTop: "0px" }}>
                {activeTab === "flights" && <FlightForm />}
                {activeTab === "stay" && <HotelForm />}
                {activeTab === "car" && <CarForm />}
              </div>
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
