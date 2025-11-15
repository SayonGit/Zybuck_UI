import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface TrendingCities {
  id: string;
  destination: string;
  route: string;
  price: string;
  duration: string;
  dates: string;
  image: string;
  isRoundTrip: boolean;
  deal?: string;
}

interface TrendingCitiesCardProps {
  deal: TrendingCities;
}

const TrendingCitiesCard: React.FC<TrendingCitiesCardProps> = ({ deal }) => {
  return (
    <Link
      to={
        "/" +
        deal.url +
        "&departDate=" +
        new Date().toISOString().split("T")[0] +
        (deal.isRoundTrip
          ? "&returnDate=" +
            new Date(new Date().setDate(new Date().getDate() + 7))
              .toISOString()
              .split("T")[0]
          : "")
      }
    >
      <div className="bg-white hover:bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={deal.image}
            alt={deal.destination}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Favorite Button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 hover:scale-110">
            <Icon icon="heroicons:heart-20-solid" className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 text-left">
              {deal.destination}
            </h3>
            {/* <span className="text-xl font-bold text-green-600">{deal.price}</span> */}
          </div>

          <p className="text-sm text-gray-600 mb-3 text-left">{deal.route}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Icon
                icon="heroicons:calendar-days-20-solid"
                className="w-3.5 h-3.5"
              />
              <span>{deal.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Icon
                icon="heroicons:arrow-path-20-solid"
                className="w-3.5 h-3.5"
              />
              <span>{deal.dates}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingCitiesCard;
