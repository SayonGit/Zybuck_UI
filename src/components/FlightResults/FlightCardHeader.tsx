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

export const FlightCardHeader = ({
  flight,
  isExpanded,
  isLoading,
  onSelect,
}: FlightCardHeaderProps) => {
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
      {/* Top Card header */}
      <div>
        <h4 className="font-semibold">
          {formatDate(new Date(flight.travelDate))}
        </h4>
        <div className="flex items-center gap-2">
          <p>{flight.from}</p>
          <Icon icon="proicons:arrow-left" rotate={90} width={18} height={18} />
          <p>{flight.to}</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center justify-between space-x-8 w-5/6">
          <div className="flex items-center gap-4">
            <div className="w-28 h-12 flex items-center justify-center">
              <img
                src={flight.logo}
                alt={`${flight.airline} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-medium text-sm">{flight.airline}</div>
              <div className="text-xs text-gray-500">
                {flight.layoverTime || flight.totalLayoverTime}
              </div>
            </div>
          </div>
          <div className="text-center flex gap-2 items-center">
            <div className="font-semibold text-lg">{flight.departure}</div>
            <span>-</span>
            <div className="font-semibold text-lg">{flight.arrival}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">{getStopsDisplay()}</div>
            <div className="text-xs text-blue-600">{flight.route}</div>
            {getStopInfo() && (
              <div className="text-xs text-gray-500 mt-1">{getStopInfo()}</div>
            )}
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{flight.duration}</div>
          </div>

          {/* price card */}
        </div>
        <div className="border border-gray-200 rounded-lg p-3 w-1/6">
          <div className="text-2xl font-bold text-gray-900">
            ${flight.price}
          </div>
          <div className="text-sm text-gray-500 mb-3">Value</div>
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
          <div className="flex justify-center space-x-2 mt-2">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Icon icon="heroicons:user" className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Icon icon="heroicons:shield-check" className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Icon icon="heroicons:chart-bar" className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Icon icon="heroicons:arrow-uturn-left" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
