import { useState } from "react";
import { FlightCardHeader } from "./FlightCardHeader";
import { FlightCardContent } from "./FlightCardContent";
import { LoadingDots } from "./LoadingDots";
import { FlightExpandedDetails } from "./FlightExpandedDetails";
import Button from "../common/Button";
import type { Flight } from "../../types";
import { useNavigation } from "../../hooks/useNavigation";
import { totalPrices } from "@/services/globalServices";
import { useSearchParams } from "react-router-dom";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { goToCheckout } = useNavigation();
  const [searchParams] = useSearchParams();

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
    }, 1000);
  };

  const handleBookFlight = () => {
    searchParams.set("from", flight.from);
    searchParams.set("to", flight.to);
    searchParams.set("date", flight.travelDate);
    searchParams.set("flightNumber", flight.flightNumber);
    searchParams.set("departureTime", flight.departure);
    searchParams.set("arrivalTime", flight.arrival);
    searchParams.set("price", flight.price.toString());
    searchParams.set("airline", flight.airline);
    searchParams.set("aircraft", flight.aircraft ?? "");
    searchParams.set("bookingClass", flight.bookingClass ?? "");
    searchParams.set("stops", flight.stops?.toString() ?? "0");
    searchParams.set("duration", flight.duration);
    searchParams.set("cabinBaggage", flight.baggage?.cabin ?? "");
    searchParams.set("checkinBaggage", flight.baggage?.checkin ?? "");
    searchParams.set("adults", searchParams.get("adults") ?? "");
    searchParams.set("children", searchParams.get("children") ?? "");
    searchParams.set("infants", searchParams.get("infants") ?? "");

    goToCheckout(searchParams, flight);
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
            variant="primary"
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
