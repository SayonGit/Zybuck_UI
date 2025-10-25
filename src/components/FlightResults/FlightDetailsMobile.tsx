// components/FlightResults/FlightDetailsMobile.tsx
import { Icon } from "@iconify/react";
import { formatDate } from "../../services/globalServices";
import styles from "./index.module.scss";
import type { Flight } from "../../types";

interface FlightDetailsMobileProps {
  flight: Flight;
}

export const FlightDetailsMobile = ({ flight }: FlightDetailsMobileProps) => {
  // Helper function to render amenities
  const renderAmenities = () => {
    const amenityItems = [];

    if (flight.amenities.wifi) {
      amenityItems.push(
        <div key="wifi" className="flex align-center gap-2">
          <Icon icon="material-symbols:wifi-rounded" height={16} width={16} />
          <p className="text-xs">
            Streaming capable WI-FI {flight.amenities.wifi ? "" : "(fee)"}
          </p>
        </div>
      );
    }

    if (flight.amenities.snacks) {
      amenityItems.push(
        <div key="snacks" className="flex align-center gap-2">
          <Icon
            icon="material-symbols:fastfood-outline-rounded"
            height={16}
            width={16}
          />
          <p className="text-xs">
            Snacks {flight.amenities.meals ? "" : "(fee)"}
          </p>
        </div>
      );
    }

    if (flight.amenities.entertainment) {
      amenityItems.push(
        <div key="entertainment" className="flex align-center gap-2">
          <Icon icon="material-symbols:tv-rounded" height={16} width={16} />
          <p className="text-xs">In-flight entertainment</p>
        </div>
      );
    }

    if (flight.amenities.powerOutlets) {
      amenityItems.push(
        <div key="power" className="flex align-center gap-2">
          <Icon icon="material-symbols:power-rounded" height={16} width={16} />
          <p className="text-xs">Power outlets</p>
        </div>
      );
    }

    return amenityItems;
  };

  return (
    <div className="lg:hidden">
      <div className="space-y-4">
        {/* Mobile Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">
              Depart • {formatDate(new Date(flight.travelDate))}
            </h4>
            <h5 className="text-sm">{flight.duration}</h5>
          </div>
          <hr className="border-gray-200" />
          <div className="flex gap-2 items-center flex-wrap">
            <h4 className="font-semibold text-sm">
              {flight.airline} {flight.flightNumber.split(" ")[1]}
            </h4>
            <div className="px-2 py-1 text-xs border-gray-300 border rounded">
              {flight.aircraft}
            </div>
          </div>
        </div>

        {/* Mobile Flight Path */}
        {/* <div
          className={`flex gap-3 items-center ${styles["internal-card-height-sm"]}`}
        >
          <div className="relative items-center flex flex-col flex-shrink-0">
            <Icon
              icon="fluent-emoji-high-contrast:radio-button"
              className="w-3 h-3 text-gray-300"
            />
            <div className="w-[1px] h-16 bg-gray-300"></div>
            <Icon
              icon="fluent-emoji-high-contrast:radio-button"
              className="w-3 h-3 text-gray-300"
            />
            <Icon
              icon="material-symbols-light:flightsmode"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-800"
            />
          </div>
          <div className="flex items-start justify-between flex-col h-full flex-1">
            <div>
              <h4 className="font-semibold text-sm">
                {flight.departure} •{" "}
                <span className="font-normal text-xs">{flight.from}</span>
              </h4>
            </div>
            <h5 className="font-normal text-gray-400 text-xs">
              {flight.duration}
            </h5>
            <div>
              <h4 className="font-semibold text-sm">
                {flight.arrival} •{" "}
                <span className="font-normal text-xs">{flight.to}</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl">
          <div className="space-y-2">{renderAmenities()}</div>
        </div> */}

        {/* Mobile Layover Sections */}
        {flight.stopDetails && flight.stopDetails.length > 0 && (
          <div className="space-y-3">
            {flight.stopDetails.map((stop, index) => (
              <div key={index} className={`pt-3 ${index !== 0 && "border-t"}`}>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium text-gray-600 text-sm">
                    Layover {stop.segmentIndex} • {stop.duration}
                  </h5>
                  <span className="text-xs text-gray-500">
                    {stop.terminal.departure}
                  </span>
                </div>
                <div
                  className={`flex gap-3 items-center ${styles["internal-card-height-sm"]}`}
                >
                  <div className="relative items-center flex flex-col flex-shrink-0">
                    <Icon
                      icon="fluent-emoji-high-contrast:radio-button"
                      className="w-3 h-3 text-gray-300"
                    />
                    <div className="w-[1px] h-16 bg-gray-300"></div>
                    <Icon
                      icon="fluent-emoji-high-contrast:radio-button"
                      className="w-3 h-3 text-gray-300"
                    />
                    <Icon
                      icon="material-symbols-light:flightsmode"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-800"
                    />
                  </div>
                  <div className="flex items-start justify-between flex-col h-full flex-1">
                    <div>
                      <h4 className="font-semibold text-sm">
                        {stop.arrivalTime} •{" "}
                        <span className="font-normal text-xs">
                          {stop.airport}
                        </span>
                      </h4>
                    </div>
                    <h5 className="font-normal text-gray-400 text-xs">
                      {stop.duration}
                    </h5>
                    <div>
                      <h4 className="font-semibold text-sm">
                        {stop.departureTime} •{" "}
                        <span className="font-normal text-xs">
                          {stop.departureAirport}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl">
                  <div className="space-y-2">{renderAmenities()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
