import { useState } from "react";
import { formatDate } from "../../services/globalServices";
import type { Flight } from "../../types";
import Button from "../common/Button";
import { Icon } from "@iconify/react";

interface FlightCardHeaderProps {
  flight: Flight;
  isExpanded: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

export const getStatusColor = (dealType: string) => {
  switch (dealType) {
    case "Best":
      return "bg-blue-100 text-blue-400";
      break;
    case "Recommended":
      return "bg-yellow-100 text-yellow-400";
      break;
    case "Cheapest":
      return "bg-green-100 text-green-400";
      break;
    default:
      return "bg-blue-100 text-blue-400";
      break;
  }
};

export const FlightCardHeader = ({
  flight,
  isExpanded,
  isLoading,
  onSelect,
}: FlightCardHeaderProps) => {
  const [save, setSave] = useState(false);

  // Helper function to display stops information
  const getStopsDisplay = () => {
    if (!flight.stops || flight.stops === 0) {
      return "Non-stop";
    }

    if (flight.stops === 1) {
      return "1 stop";
    }

    return `${flight.stops} stops`;
  };

  // Helper function to get stop details for display
  const getStopInfo = () => {
    if (!flight.stopDetails || flight.stopDetails.length === 0) {
      return null;
    }

    if (flight.stopDetails.length === 1) {
      return flight.stopDetails[0].airport;
    }

    // For multiple stops, show all airports
    return flight.stopDetails
      .map((stop) => stop.airport.split(" ")[0])
      .join(", ");
  };

  return (
    /* Desktop Layout */
    <div className="hidden lg:flex flex-col space-y-8">
      <div className="flex">
        <div className="flex  p-3 sm:p-6 flex-col w-5/6">
          <div className="flex items-center justify-between">
            <div
              onClick={() => setSave(save ? false : true)}
              className="flex rounded-sm items-center select-none justify-between border border-gray-200 px-2 py-1 w-fit gap-2 hover:border-gray-300 cursor-pointer"
            >
              <Icon icon={save ? "mdi:heart" : "mdi:heart-outline"}></Icon>
              <h6 className="text-sm">Save</h6>
            </div>
            <div
              className={`flex rounded-sm items-center select-none justify-between px-2 py-1 w-fit gap-2 ${getStatusColor(
                flight.dealType
              )}`}
            >
              <h4 className="font-semibold text-sm">{flight.dealType}</h4>
            </div>
          </div>
          <div className="flex my-auto items-center justify-between space-x-8 w-full">
            <div className="flex items-center gap-4">
              <div className="w-28 h-12 flex items-center justify-center">
                <img
                  src={flight.logo}
                  alt={`${flight.airline} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-center flex gap-2 items-center">
                  <div className="font-semibold text-lg">
                    {flight.departure}
                  </div>
                  <span>-</span>
                  <div className="font-semibold text-lg">{flight.arrival}</div>
                </div>
                <div className="font-medium text-gray-400 text-sm">
                  {flight.airline}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg">{getStopsDisplay()}</div>
              {/* <div className="text-xs text-blue-600">{flight.route}</div> */}
              {getStopInfo() && (
                <div className="font-medium text-gray-400 text-sm">
                  {getStopInfo()}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg">{flight.duration}</div>
              <div className="font-medium text-gray-400 text-sm">
                {flight.route}
              </div>
            </div>
          </div>

          {/* price card */}
        </div>
        <div className="border-l border-gray-200 p-3 sm:p-6 w-1/6">
          <div className="flex space-x-2 mb-2">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-600 p-1 border border-gray-300 rounded-sm">
              <Icon icon="mdi:bag-suitcase-outline" className="w-4 h-4" />
              <p className="text-sm text-gray-600">1</p>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-600 p-1 border border-gray-300 rounded-sm">
              <Icon icon="heroicons:shield-check" className="w-4 h-4" />
              <p className="text-sm text-gray-600">0</p>
            </button>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${flight.price}
          </div>
          <div className="text-sm text-gray-500">
            {flight.dealType === "Best" && "Basic Economy"}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {flight.dealType === "Best" && "Main Cabin"}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {flight.dealType === "Recommended" && "Basic Premium"}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {flight.dealType === "Cheapest" && "Value"}
          </div>
          <Button
            variant="secondary"
            onClick={onSelect}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md transition-colors text-white w-full ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : isExpanded ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    </div>
  );
};
