// components/FlightResults/FlightDetailsDesktop.tsx
import { Icon } from "@iconify/react";
import { formatDate } from "../../services/globalServices";
import styles from "./index.module.scss";
import type { Flight } from "../../types";

interface FlightDetailsDesktopProps {
  flight: Flight;
}

export const FlightDetailsDesktop = ({ flight }: FlightDetailsDesktopProps) => {
  // Helper function to render amenities
  const renderAmenities = () => {
    const amenityItems = [];

    if (flight.amenities.wifi) {
      amenityItems.push(
        <div key="wifi" className="flex align-center gap-2">
          <Icon icon="material-symbols:wifi-rounded" height={20} width={20} />
          <p>Streaming capable WI-FI {flight.amenities.wifi ? "" : "(fee)"}</p>
        </div>
      );
    }

    if (flight.amenities.snacks) {
      amenityItems.push(
        <div key="snacks" className="flex align-center gap-2">
          <Icon
            icon="material-symbols:fastfood-outline-rounded"
            height={20}
            width={20}
          />
          <p>Snacks {flight.amenities.meals ? "" : "(fee)"}</p>
        </div>
      );
    }

    if (flight.amenities.entertainment) {
      amenityItems.push(
        <div key="entertainment" className="flex align-center gap-2">
          <Icon icon="material-symbols:tv-rounded" height={20} width={20} />
          <p>In-flight entertainment</p>
        </div>
      );
    }

    if (flight.amenities.powerOutlets) {
      amenityItems.push(
        <div key="power" className="flex align-center gap-2">
          <Icon icon="material-symbols:power-rounded" height={20} width={20} />
          <p>Power outlets</p>
        </div>
      );
    }

    return amenityItems;
  };

  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-1 gap-6">
        {/* Left Column - Flight Details */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <h4 className="font-semibold">
              Depart • {formatDate(new Date(flight.travelDate))}
            </h4>
            <h5 className="">{flight.duration}</h5>
          </div>
          <hr className="border-gray-200" />
          <div className="flex gap-3 items-center">
            <h4 className="font-semibold">
              {flight.airline} {flight.flightNumber.split(" ")[1]}
            </h4>
            <div className="px-3 py-1 text-sm border-gray-300 border">
              {flight.aircraft}
            </div>
          </div>
          {/* Departure Section */}
          <div className="flex justify-between items-center">
            <div
              className={
                "flex gap-3 items-center " + styles["internal-card-height"]
              }
            >
              <div className="relative items-center flex flex-col">
                <Icon
                  icon="fluent-emoji-high-contrast:radio-button"
                  className="w-3 h-3 text-gray-300"
                />
                <div className="w-[1px] h-20 bg-gray-300"></div>
                <Icon
                  icon="fluent-emoji-high-contrast:radio-button"
                  className="w-3 h-3 text-gray-300"
                />
                <Icon
                  icon="material-symbols-light:flightsmode"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"
                />
              </div>
              <div className="flex items-start justify-between flex-col h-full">
                <h4 className="font-semibold">
                  {flight.departure} •{" "}
                  <span className="font-normal">{flight.from}</span>
                </h4>
                <h5 className="font-normal text-gray-400">{flight.duration}</h5>
                <h4 className="font-semibold">
                  {flight.arrival} •{" "}
                  <span className="font-normal">{flight.to}</span>
                </h4>
              </div>
            </div>
            <div className="bg-gray-100 h-fit mr-4 p-4 rounded-2xl max-w-72">
              {renderAmenities()}
            </div>
          </div>

          {/* Layover Section (if applicable) */}
          {flight.stopDetails && flight.stopDetails.length > 0 && (
            <div className={`space-y-4`}>
              {flight.stopDetails.map((stop, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-600">
                      Layover {stop.stopNumber} • {stop.layoverDuration}
                    </h5>
                    <span className="text-sm text-gray-500">
                      {stop.terminal}
                    </span>
                  </div>
                  <div
                    className={`flex gap-3 items-center ${styles["internal-card-height"]}`}
                  >
                    <div className="relative items-center flex flex-col">
                      <Icon
                        icon="fluent-emoji-high-contrast:radio-button"
                        className="w-3 h-3 text-gray-300"
                      />
                      <div className="w-[1px] h-20 bg-gray-300"></div>
                      <Icon
                        icon="fluent-emoji-high-contrast:radio-button"
                        className="w-3 h-3 text-gray-300"
                      />
                      <Icon
                        icon="material-symbols-light:flightsmode"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"
                      />
                    </div>
                    <div className="flex items-start justify-between flex-col h-full">
                      <h4 className="font-semibold">
                        {stop.arrivalTime} •{" "}
                        <span className="font-normal">{stop.airport}</span>
                      </h4>
                      <h5 className="font-normal text-gray-400">
                        {stop.layoverDuration}
                      </h5>
                      <h4 className="font-semibold">
                        {stop.departureTime} •{" "}
                        <span className="font-normal">{stop.city}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
