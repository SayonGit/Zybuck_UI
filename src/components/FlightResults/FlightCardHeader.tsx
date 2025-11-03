import { useState } from "react";
import type { Flight } from "../../types";
import Button from "../common/Button";
import { Icon } from "@iconify/react";
import { totalPrices } from "@/services/globalServices";

interface FlightCardHeaderProps {
  flight: Flight;
  isExpanded: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

export const getStatusColor = (dealType: string) => {
  switch (dealType) {
    case "Best":
      return "bg-primary-100 text-primary-500";
    case "Recommended":
      return "bg-yellow-100 text-yellow-500";
    case "Cheapest":
      return "bg-green-100 text-green-500";
    case "Quickest":
      return "bg-purple-100 text-purple-500";
    default:
      return "bg-gray-100 text-gray-400";
  }
};

export const FlightCardHeader = ({
  flight,
  isLoading,
  onSelect,
}: FlightCardHeaderProps) => {
  const [save, setSave] = useState(false);

  const getStopsDisplay = (flight: Flight) => {
    if (!flight.stops || flight.stops === 0) return "Non-stop";
    if (flight.stops === 1) return "1 stop";
    return `${flight.stops} stops`;
  };

  const getStopInfo = (flight: Flight) => {
    if (!flight.stopDetails?.length) return null;
    if (flight.stopDetails.length === 1) return flight.stopDetails[0].airport;
    return flight.stopDetails
      ?.slice(0, -1)
      .map((f) => f.arrivalAirport)
      .join(", ");
  };

  const getDealLabel = () => {
    switch (flight.dealType) {
      case "Best":
        return "Main Cabin";
      case "Recommended":
        return "Premium Value";
      case "Cheapest":
        return "Value Fare";
      case "Quickest":
        return "Express Flight";
      default:
        return "Standard";
    }
  };

  return (
    <div className="hidden lg:flex flex-col space-y-8">
      <div className="flex">
        <div className="flex p-3 sm:p-6 flex-col w-5/6">
          <div className="flex items-center justify-between">
            <div
              onClick={() => setSave(!save)}
              className="flex rounded-sm items-center select-none justify-between border border-gray-200 px-2 py-1 w-fit gap-2 hover:border-gray-300 cursor-pointer"
            >
              <Icon icon={save ? "mdi:heart" : "mdi:heart-outline"} />
              <h6 className="text-sm">Save</h6>
            </div>

            <div
              className={`flex rounded-sm items-center select-none justify-between px-2 py-1 w-fit gap-2 ${getStatusColor(
                flight.dealType!
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
                <div className="flex gap-2 items-center">
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
              <div className="font-semibold text-lg">
                {getStopsDisplay(flight)}
              </div>
              {getStopInfo(flight) && (
                <div className="font-medium text-gray-400 text-sm">
                  {getStopInfo(flight)}
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="font-semibold text-lg">{flight.duration}</div>
              <div className="font-medium text-gray-400 text-sm">
                {flight.route!}
              </div>
            </div>
          </div>
          {flight.roundTrip && (
            <div className="flex my-auto items-center justify-between space-x-8 w-full">
              <div className="flex items-center gap-4">
                <div className="w-28 h-12 flex items-center justify-center">
                  <img
                    src={flight.roundTrip.logo}
                    alt={`${flight.roundTrip.airline} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="font-semibold text-lg">
                      {flight.roundTrip.departure}
                    </div>
                    <span>-</span>
                    <div className="font-semibold text-lg">
                      {flight.roundTrip.arrival}
                    </div>
                  </div>
                  <div className="font-medium text-gray-400 text-sm">
                    {flight.roundTrip.airline}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-lg">
                  {getStopsDisplay(flight.roundTrip)}
                </div>
                {getStopInfo(flight.roundTrip) && (
                  <div className="font-medium text-gray-400 text-sm">
                    {getStopInfo(flight.roundTrip)}
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="font-semibold text-lg">
                  {flight.roundTrip.duration}
                </div>
                <div className="font-medium text-gray-400 text-sm">
                  {flight.roundTrip.route!}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price section */}
        <div className="border-l border-gray-200 p-3 sm:p-6 w-1/6">
          <div className="flex space-x-2 mb-2">
            <button className="flex items-center gap-2 text-gray-600 p-1 border border-gray-300 rounded-sm">
              <Icon icon="mdi:bag-suitcase-outline" className="w-4 h-4" />
              <p className="text-sm">1</p>
            </button>
            <button className="flex items-center gap-2 text-gray-600 p-1 border border-gray-300 rounded-sm">
              <Icon icon="heroicons:shield-check" className="w-4 h-4" />
              <p className="text-sm">0</p>
            </button>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            {totalPrices(flight.price, flight.roundTrip?.price! || "$0")}
          </div>
          {/* <div className="text-2xl font-bold text-gray-900">
            {flight.roundTrip?.price}
          </div> */}
          <div className="text-sm text-gray-500 mb-3">{getDealLabel()}</div>

          <Button
            variant="secondary"
            onClick={onSelect}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md transition-colors text-white w-full text-xs ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Flight Details"}
          </Button>
        </div>
      </div>
    </div>
  );
};
