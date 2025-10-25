import { useState } from "react";
import { FlightCardHeader } from "./FlightCardHeader";
import { FlightCardContent } from "./FlightCardContent";
import { LoadingDots } from "./LoadingDots";
import { FlightExpandedDetails } from "./FlightExpandedDetails";
import Button from "../common/Button";
import type { Flight } from "../../types";
import { useNavigation } from "../../hooks/useNavigation";
import { totalPrices } from "@/services/globalServices";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { goToCheckout } = useNavigation();

  const handleFlightSelect = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }

    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      setIsExpanded(true);
    }, 2000);
  };

  const handleBookFlight = () => {
    const params = new URLSearchParams();
    params.set("from", flight.from);
    params.set("to", flight.to);
    params.set("date", flight.travelDate);
    params.set("flightNumber", flight.flightNumber);
    params.set("departureTime", flight.departure);
    params.set("arrivalTime", flight.arrival);
    params.set("price", flight.price.toString());
    params.set("airline", flight.airline);
    params.set("aircraft", flight.aircraft ?? "");
    params.set("bookingClass", flight.bookingClass ?? "");
    params.set("stops", flight.stops?.toString() ?? "0");
    params.set("duration", flight.duration);
    params.set("cabinBaggage", flight.baggage?.cabin ?? "");
    params.set("checkinBaggage", flight.baggage?.checkin ?? "");

    goToCheckout(params);
  };

  return (
    <div
      className={`border rounded-lg ${
        isExpanded ? "border-gray-200 shadow-none" : "border-gray-200"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-sm transition-all duration-300 ${
          isExpanded ? "rounded-br-none rounded-bl-none" : ""
        }`}
      >
        <FlightCardHeader
          flight={flight}
          isExpanded={isExpanded}
          isLoading={isLoading}
          onSelect={handleFlightSelect}
        />

        <FlightCardContent
          flight={flight}
          isExpanded={isExpanded}
          isLoading={isLoading}
          onSelect={handleFlightSelect}
        />
      </div>
      {isLoading && <LoadingDots />}
      {isExpanded && <FlightExpandedDetails flight={flight} />}
      {isExpanded && (
        <div className="mt-3 mb-3 mr-3 justify-end ml-auto flex gap-4">
          <div className="flex flex-col items-end justify-around">
            <p className="text-xs text-gray-600">{flight.dealType}</p>
            <p className="font-semibold text-lg">
              {totalPrices(flight.price, flight.roundTrip?.price! || "$0")}
            </p>
          </div>
          <Button
            variant="secondary"
            className="px-14"
            size="lg"
            onClick={handleBookFlight}
          >
            Select
          </Button>
        </div>
      )}
    </div>
  );
};
