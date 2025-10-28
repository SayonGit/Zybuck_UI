// components/FlightResults/FlightCardContent.tsx
import { Icon } from "@iconify/react";
import type { Flight } from "../../types";
import Button from "../common/Button";
import { useState } from "react";
import { getStatusColor } from "./FlightCardHeader";
import { totalPrices } from "@/services/globalServices";

interface FlightCardContentProps {
  flight: Flight;
  isExpanded: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

export const FlightCardContent = ({
  flight,
  isLoading,
  onSelect,
}: FlightCardContentProps) => {
  const [save, setSave] = useState(false);
  // Helper function to display stops information
  const getStopsDisplay = (flight: Flight) => {
    if (!flight.stops || flight.stops === 0) {
      return "Non-stop";
    }

    if (flight.stops === 1) {
      return "1 stop";
    }

    return `${flight.stops} stops`;
  };

  // Helper function to get stop details for display
  // const getStopInfo = (flight: Flight) => {
  //   if (!flight.stopDetails || flight.stopDetails.length === 0) {
  //     return null;
  //   }

  //   if (flight.stopDetails.length === 1) {
  //     return flight.stopDetails[0].airport;
  //   }

  //   return flight.stopDetails
  //     ?.slice(0, -1)
  //     .map((f) => f.arrivalAirport)
  //     .join(", ");
  // };

  return (
    /* Mobile Layout */
    <div className="lg:hidden p-2">
      {/* Header Row - Airline Logo and Details */}
      <div className="flex items-center justify-between mb-2">
        <div
          onClick={() => setSave(save ? false : true)}
          className="flex rounded-sm items-center select-none justify-between border border-gray-200 px-2 py-1 w-fit gap-2 hover:border-gray-300 cursor-pointer"
        >
          <Icon icon={save ? "mdi:heart" : "mdi:heart-outline"}></Icon>
          <h6 className="text-xs">Save</h6>
        </div>
        <div
          className={`flex rounded-sm items-center select-none justify-between px-2 py-1 w-fit gap-2 ${getStatusColor(
            flight.dealType!
          )}`}
        >
          <h4 className="font-semibold text-xs">{flight.dealType}</h4>
        </div>
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-8 flex items-center justify-center flex-shrink-0">
            <img
              src={flight.logo}
              alt={`${flight.airline} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-medium text-sm">{flight.airline}</div>
            <div className="text-xs text-gray-500">
              {flight.totalLayoverTime}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">
            {totalPrices(flight.price, flight.roundTrip?.price || "")}
          </div>
          <div className="text-xs text-gray-500">
            {flight.dealType === "Best" && "Basic Economy"}
          </div>
          <div className="text-xs text-gray-500">
            {flight.dealType === "Best" && "Main Cabin"}
          </div>
          <div className="text-xs text-gray-500">
            {flight.dealType === "Recommended" && "Basic Premium"}
          </div>
          <div className="text-xs text-gray-500">
            {flight.dealType === "Cheapest" && "Value"}
          </div>
        </div>
      </div>

      {/* Flight Path Visualization - Mobile */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="font-semibold text-base">{flight.departure}</div>
          <div className="text-xs text-gray-500 mt-1">
            {flight.from.split(" ")[0]}
          </div>
        </div>

        <div className="flex-1 mx-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">{flight.duration}</div>
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="absolute left-0 -top-1 w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-300 rounded-full"></div>
              <Icon
                icon="material-symbols-light:flightsmode"
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-4 text-gray-800 bg-white"
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {getStopsDisplay(flight)}
            </div>
            <div className="text-xs text-blue-600">{flight.route}</div>
          </div>
        </div>

        <div className="text-center">
          <div className="font-semibold text-base">{flight.arrival}</div>
          <div className="text-xs text-gray-500 mt-1">
            {flight.to.split(" ")[0]}
          </div>
        </div>
      </div>
      {flight.roundTrip && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="font-semibold text-base">
              {flight.roundTrip?.departure}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {flight.roundTrip?.from?.split(" ")[0]}
            </div>
          </div>

          <div className="flex-1 mx-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                {flight.roundTrip?.duration}
              </div>
              <div className="relative flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="absolute left-0 -top-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                <Icon
                  icon="material-symbols-light:flightsmode"
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-4 text-gray-800 bg-white"
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {getStopsDisplay(flight.roundTrip)}
              </div>
              <div className="text-xs text-blue-600">
                {flight.roundTrip?.route}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="font-semibold text-base">
              {flight.roundTrip?.arrival}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {flight.roundTrip?.to?.split(" ")[0]}
            </div>
          </div>
        </div>
      )}

      {/* Stop Info Card */}
      {/* {getStopInfo(flight) && (
        <div className="bg-gray-50 rounded-lg p-2 mb-3">
          <div className="text-xs text-gray-600 text-center">
            <Icon icon="heroicons:map-pin" className="w-3 h-3 inline mr-1" />
            Stop: {getStopInfo(flight)}
          </div>
        </div>
      )} */}

      {/* Action Row with Select Button */}
      <div className="flex items-center gap-2 justify-between pt-3 border-t border-gray-100">
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-600 p-1 border border-gray-300 rounded-sm">
            <Icon icon="mdi:bag-suitcase-outline" className="w-4 h-4" />
            <p className="text-sm text-gray-600">1</p>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-600 p-1 border border-gray-300 rounded-sm">
            <Icon icon="heroicons:shield-check" className="w-4 h-4" />
            <p className="text-sm text-gray-600">0</p>
          </button>
        </div>
        <Button
          onClick={onSelect}
          disabled={isLoading}
          variant="secondary"
          className={`px-6 py-2 rounded-md transition-colors text-white w-full ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Flight Details"}
        </Button>
      </div>
    </div>
  );
};
