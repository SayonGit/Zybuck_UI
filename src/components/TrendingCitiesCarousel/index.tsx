import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import TrendingCities from "./TrendingCitiesCard";

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

  // Updated flight deals with working image URLs and types
  const allTrendingCities: TrendingCities[] = [
    // International Flights
    {
      id: "1",
      destination: "Paris",
      route: "Washington, D.C. to Paris",
      price: "$649",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=1",
      isRoundTrip: true,
      type: "international",
    },
    {
      id: "2",
      destination: "Tokyo",
      route: "Washington, D.C. to Tokyo",
      price: "$899",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=2",
      isRoundTrip: true,
      type: "international",
    },
    {
      id: "3",
      destination: "London",
      route: "Washington, D.C. to London",
      price: "$549",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=3",
      isRoundTrip: true,
      type: "international",
    },
    {
      id: "4",
      destination: "Dubai",
      route: "Washington, D.C. to Dubai",
      price: "$749",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=4",
      isRoundTrip: true,
      type: "international",
    },
    {
      id: "5",
      destination: "Sydney",
      route: "Washington, D.C. to Sydney",
      price: "$1,199",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=5",
      isRoundTrip: true,
      type: "international",
    },
    {
      id: "6",
      destination: "Cairo",
      route: "Washington, D.C. to Cairo",
      price: "$849",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=6",
      isRoundTrip: true,
      type: "international",
    },
    // Domestic Flights
    {
      id: "7",
      destination: "Los Angeles",
      route: "Washington, D.C. to Los Angeles",
      price: "$299",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=7",
      isRoundTrip: true,
      type: "domestic",
    },
    {
      id: "8",
      destination: "Miami",
      route: "Washington, D.C. to Miami",
      price: "$199",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=8",
      isRoundTrip: true,
      type: "domestic",
    },
    {
      id: "9",
      destination: "Chicago",
      route: "Washington, D.C. to Chicago",
      price: "$149",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=9",
      isRoundTrip: true,
      type: "domestic",
    },
    {
      id: "10",
      destination: "San Francisco",
      route: "Washington, D.C. to San Francisco",
      price: "$349",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=10",
      isRoundTrip: true,
      type: "domestic",
    },
    {
      id: "11",
      destination: "Las Vegas",
      route: "Washington, D.C. to Las Vegas",
      price: "$229",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=11",
      isRoundTrip: true,
      type: "domestic",
    },
    {
      id: "12",
      destination: "Seattle",
      route: "Washington, D.C. to Seattle",
      price: "$279",
      duration: "Jul 1 - Jul 11",
      dates: "Round-trip",
      image: "https://picsum.photos/800/600?random=12",
      isRoundTrip: true,
      type: "domestic",
    },
  ];

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

  return (
    <section className="w-full my-12 bg-gray-50">
      <div className="w-full px-4 sm:px-0 lg:px-0">
        {/* Header - Left Aligned */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div className="text-left mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Top Flight Deals Near You
            </h2>
            <p className="text-gray-600">
              What people says about Globie facilities
            </p>
          </div>

          {/* See All Button */}
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700 hover:underline self-start lg:self-center">
            See All
          </button>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
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
