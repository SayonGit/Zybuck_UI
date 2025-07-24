import React, { useState } from "react";
import FlightForm from "../FlightForm";
import "./index.scss";
import { Icon } from "@iconify/react";
import InfiniteScrollImages from "../../InfiniteImageScroll";
import HotelForm from "../HotelForm";
import CarForm from "../CarForm";

type TabTypes = "flights" | "stay" | "car";

const FormControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("flights");
  const tabs = [
    {
      id: "flights",
      label: "Flights",
      icon: "material-symbols-light:flight",
      rotate: 45,
    },
    {
      id: "stay",
      label: "Stay",
      icon: "material-symbols:king-bed-rounded",
      rotate: 0,
    },
    { id: "car", label: "Car", icon: "mdi:car", rotate: 0 },
  ];

  const scrollingImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "London, United Kingdom - Big Ben and Westminster",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "Paris, France - Eiffel Tower at sunset",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "Tokyo, Japan - City skyline with modern buildings",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "Santorini, Greece - White buildings and blue domes",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "Barcelona, Spain - Sagrada Familia cathedral",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "Dubai, UAE - Burj Khalifa skyline at sunset",
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "New York, USA - Manhattan skyline",
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop&auto=format&q=75",
      alt: "Istanbul, Turkey - Hagia Sophia and cityscape",
    },
  ];

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
                      onClick={() => setActiveTab(tab.id as TabTypes)}
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
