import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  destination: any;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link
      to={
        "/" +
        destination.url +
        "&departDate=" +
        new Date().toISOString().split("T")[0] +
        (destination.isRoundTrip
          ? "&returnDate=" +
            new Date(new Date().setDate(new Date().getDate() + 7))
              .toISOString()
              .split("T")[0]
          : "")
      }
    >
      <div className="group hover:bg-gray-100 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
        {/* Flex Container: Image and Text */}
        <div className="flex items-center">
          {/* Image */}
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={destination.image}
              alt={`${destination.cityName}, ${destination.countryName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />

            {/* Popular Badge */}
            {/* {destination.isPopular && (
            <div className="absolute -top-1 -right-1 bg-orange-500 text-white w-3 h-3 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )} */}
          </div>

          {/* Text Content */}
          <div className="flex-1 p-3 flex items-center gap-4 min-w-0">
            <div>
              <h3 className="font-medium text-gray-900 text-sm truncate">
                {destination.cityName}
              </h3>

              <p className="text-xs text-gray-500 truncate">
                {destination.countryName}
              </p>
            </div>
            {destination.category === "popular" && (
              <div className="flex gap-4 items-center">
                <Icon icon="maki:arrow"></Icon>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm truncate">
                    {destination.secondCityName}
                  </h3>

                  <p className="text-xs text-gray-500 truncate">
                    {destination.secondCountryName}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Arrow Icon */}
          <div className="flex-shrink-0">
            <Icon
              icon="heroicons:chevron-right-20-solid"
              className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
