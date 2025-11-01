import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import FlightDealCard from "./FlightDealCard";
// import { useAppData } from "../../hooks/useAppData";
import { SWIPE_THRESHOLD } from "../../utils/constants";
import { useConfig } from "@/context/configContext";
import { useCarousels } from "@/hooks/useCarousel";

interface FlightDeal {
  id: string;
  destination: string;
  route: string;
  price: string;
  duration: string;
  dates: string;
  image: string;
  isRoundTrip: boolean;
  type: "international" | "domestic";
}

const FlightDealsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"international" | "domestic">(
    "international"
  );
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  // Get flight deals from Redux store
  // const { flightDeals } = useAppData();
  const { config } = useConfig();
  const { data: carouselData } = useCarousels();

  // Transform Redux data to match component interface
  const allFlightDeals: FlightDeal[] = (carouselData?.flight_deals ?? []).map(
    (deal: any) => ({
      id: deal.id.toString(),
      destination: deal.to,
      route: `${deal.from} to ${deal.to}`,
      price: `$${deal.price}`,
      duration: `${deal.departure} - ${deal.return}`,
      dates: "Round-trip",
      image: deal.image,
      isRoundTrip: true,
      type: deal.type || "international",
    })
  );

  // Filter deals based on active tab
  const filteredFlightDeals = allFlightDeals.filter(
    (deal) => deal.type === activeTab
  );

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    largeDesktop: 4,
  };

  const getItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.desktop;
    if (window.innerWidth >= 1536) return itemsPerView.largeDesktop;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(
    getItemsPerView()
  );
  const maxIndex = Math.max(
    0,
    filteredFlightDeals.length - currentItemsPerView
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset carousel when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  // const goToSlide = (index: number) => {
  //   setCurrentIndex(index);
  // };

  const handleTabChange = (tab: "international" | "domestic") => {
    setActiveTab(tab);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchEndX.current - touchStartX.current;
      if (Math.abs(distance) > SWIPE_THRESHOLD) {
        if (distance > 0) {
          goToPrev();
        } else {
          goToNext();
        }
      }
    }
    setIsAutoPlaying(true);
  };

  return (
    <section className="w-full my-12 bg-gray-50">
      <div className="w-full px-4 sm:px-0 lg:px-0">
        {/* Header - Left Aligned */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div className="text-left mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {config?.flight_deals?.heading || "Top Flight Deals Near You"}
            </h2>
            <p className="text-gray-600">
              {config?.flight_deals?.sub_heading ||
                "What people says about Globie facilities"}
            </p>
          </div>

          {/* See All Button */}
          {config?.flight_deals.is_button && (
            <button
              onClick={() => {
                // Navigate to flight deals page
                window.location.href =
                  config?.flight_deals?.btn_url || "/flight-deals";
              }}
              className="text-blue-600 font-medium text-sm hover:text-blue-700 hover:underline self-start lg:self-center"
            >
              {config?.flight_deals?.btn_text || "See All"}
            </button>
          )}
        </div>

        {/* Tab Bar - Between Title and Carousel */}
        <div className="flex justify-start mb-8 border-b border-gray-200">
          <div className="inline-flex">
            <button
              className={`px-6 py-3 font-medium text-sm transition-all duration-200 cursor-pointer border-b-2 ${
                activeTab === "international"
                  ? "text-primary-600 border-primary-600"
                  : "text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("international")}
            >
              International
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm transition-all duration-200 cursor-pointer border-b-2 ${
                activeTab === "domestic"
                  ? "text-primary-600 border-primary-600"
                  : "text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("domestic")}
            >
              Domestic
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          {maxIndex > 0 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToPrev}
                disabled={currentIndex === 0}
              >
                <Icon
                  icon="heroicons:chevron-left-20-solid"
                  className="w-5 h-5"
                />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
              >
                <Icon
                  icon="heroicons:chevron-right-20-solid"
                  className="w-5 h-5"
                />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden p-4 rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / currentItemsPerView)
                }%)`,
              }}
            >
              {filteredFlightDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / currentItemsPerView}%` }}
                >
                  <FlightDealCard deal={deal} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator - Only show if there are multiple pages */}
          {/* {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )} */}
        </div>

        {/* No deals message */}
        {filteredFlightDeals.length === 0 && (
          <div className="text-center py-12">
            <Icon
              icon="heroicons:exclamation-triangle-20-solid"
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
            />
            <p className="text-gray-600">
              No {activeTab} flights available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlightDealsCarousel;
