// components/FlightResults/FlightDetailsDesktop.tsx
import { Icon } from "@iconify/react";
import { formatDate } from "../../services/globalServices";
import styles from "./index.module.scss";
import type { Flight } from "../../types";

interface FlightDetailsDesktopProps {
  flight: Flight;
  tripStatus: string;
}

export const FlightDetailsDesktop = ({
  flight,
  tripStatus,
}: FlightDetailsDesktopProps) => {
  const renderAmenities = () => {
    const amenities = [];

    if (flight.amenities?.wifi) {
      amenities.push(
        <div key="wifi" className="flex items-center gap-2">
          <Icon icon="material-symbols:wifi-rounded" height={20} width={20} />
          <p>Streaming capable Wi-Fi</p>
        </div>
      );
    }

    if (flight.amenities?.entertainment) {
      amenities.push(
        <div key="entertainment" className="flex items-center gap-2">
          <Icon icon="material-symbols:tv-rounded" height={20} width={20} />
          <p>In-flight entertainment</p>
        </div>
      );
    }

    if (flight.amenities?.meals) {
      amenities.push(
        <div key="meals" className="flex items-center gap-2">
          <Icon
            icon="material-symbols:restaurant-outline-rounded"
            height={20}
            width={20}
          />
          <p>Complimentary meals</p>
        </div>
      );
    }

    if (flight.amenities?.snacks) {
      amenities.push(
        <div key="snacks" className="flex items-center gap-2">
          <Icon
            icon="material-symbols:fastfood-outline-rounded"
            height={20}
            width={20}
          />
          <p>Snacks available</p>
        </div>
      );
    }

    if (flight.amenities?.powerOutlets) {
      amenities.push(
        <div key="power" className="flex items-center gap-2">
          <Icon icon="material-symbols:power-rounded" height={20} width={20} />
          <p>Power outlets</p>
        </div>
      );
    }

    if (flight.amenities?.streaming) {
      amenities.push(
        <div key="streaming" className="flex items-center gap-2">
          <Icon
            icon="material-symbols:movie-outline-rounded"
            height={20}
            width={20}
          />
          <p>Streaming available</p>
        </div>
      );
    }

    if (flight.amenities?.blanket) {
      amenities.push(
        <div key="blanket" className="flex items-center gap-2">
          <Icon
            icon="material-symbols:bed-outline-rounded"
            height={20}
            width={20}
          />
          <p>Blankets provided</p>
        </div>
      );
    }

    return amenities;
  };

  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between">
            <h4 className="font-semibold">
              {tripStatus} • {formatDate(new Date(flight.travelDate))}
            </h4>
            <h5>{flight.duration}</h5>
          </div>

          <hr className="border-gray-200" />

          {/* Airline Info */}
          <div className="flex gap-3 items-center">
            <h4 className="font-semibold">
              {flight.airline} {flight.flightNumber?.split(" ")[1] ?? ""}
            </h4>
            {flight.aircraft && (
              <div className="px-3 py-1 text-sm border border-gray-300 rounded-md">
                {flight.aircraft}
              </div>
            )}
          </div>

          {/* Departure and Arrival Overview */}
          {/* <div className="flex justify-between items-center">
            <div
              className={`flex gap-3 items-center ${styles["internal-card-height"]}`}
            >
              <div className="relative flex flex-col items-center">
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
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

            <div className="bg-gray-100 p-4 rounded-2xl max-w-72 mr-4">
              {renderAmenities()}
            </div>
          </div> */}

          {/* Flight Segments (A→B, B→C, etc.) */}
          {flight.stopDetails && flight.stopDetails.length > 0 && (
            <div className="space-y-4 mt-4">
              {flight.stopDetails.map((segment, index) => (
                <div
                  key={index}
                  className={`flex justify-between border-gray-200 pt-4 pb-2 space-y-2 ${
                    index !== 0 && "border-t"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-medium text-gray-600">
                        {segment.leg}
                      </h5>
                      <span className="text-sm text-gray-500">
                        {segment.carrierCode} {segment.flightNumber}
                      </span>
                    </div>

                    <div
                      className={`flex gap-3 items-center ${styles["internal-card-height"]}`}
                    >
                      <div className="relative flex flex-col items-center">
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
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full">
                        <h4 className="font-semibold">
                          {segment.departureTime} •{" "}
                          <span className="font-normal">
                            {segment.departureAirport}
                          </span>
                        </h4>
                        <h5 className="font-normal text-gray-400">
                          Duration: {segment.duration}
                        </h5>
                        <h4 className="font-semibold">
                          {segment.arrivalTime} •{" "}
                          <span className="font-normal">
                            {segment.arrivalAirport}
                          </span>
                        </h4>
                      </div>
                    </div>

                    {(segment.terminal?.departure ||
                      segment.terminal?.arrival) && (
                      <p className="text-sm text-gray-500">
                        Terminals: {segment.terminal.departure} →{" "}
                        {segment.terminal.arrival}
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-100 p-4 rounded-2xl max-w-72 mr-4 h-min">
                    {renderAmenities()}
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
