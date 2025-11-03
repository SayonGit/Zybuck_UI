import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import TrendingCities from "./TrendingCitiesCard";
// import { useAppData } from "../../hooks/useAppData";
import { SWIPE_THRESHOLD } from "../../utils/constants";
import { useConfig } from "@/context/configContext";
import { useCarousels } from "@/hooks/useCarousel";

interface TrendingCities {
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

const TrendingCitiesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  // Get trending cities from Redux store
  // const { trendingCities } = useAppData();
  const { config } = useConfig();
  const { data: carouselData } = useCarousels();
  // Transform Redux data to match component interface
  const allTrendingCities: TrendingCities[] = (
    carouselData?.trending_cities ?? []
  ).map((city: any) => ({
    id: city.id.toString(),
    destination: city.name,
    route: `${city.name}, ${city.country}`,
    price: `$${city.deals}`, // Using deals count as price for demo
    duration: "Trending",
    dates: "Popular destination",
    image: city.image,
    isRoundTrip: true,
    type: "international", // Default to international
  }));

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
  const maxIndex = Math.max(0, allTrendingCities.length - currentItemsPerView);

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              {config?.trending_cities?.heading || "Trending Cities"}
            </h2>
            <p className="text-gray-600">
              {config?.trending_cities?.sub_heading ||
                "Popular destinations travelers love"}
            </p>
          </div>

          {/* See All Button */}
          {config?.trending_cities.is_button && (
            <button
              onClick={() => {
                // Navigate to trending cities page
                window.location.href =
                  config?.trending_cities?.btn_url || "/trending-cities";
              }}
              className="text-blue-600 font-medium text-sm hover:text-blue-700 hover:underline self-start lg:self-center"
            >
              {config?.trending_cities?.btn_text || "See All"}
            </button>
          )}
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
              {allTrendingCities.map((deal) => (
                <div
                  key={deal.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / currentItemsPerView}%` }}
                >
                  <TrendingCities deal={deal} />
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
      </div>
    </section>
  );
};

export default TrendingCitiesCarousel;
