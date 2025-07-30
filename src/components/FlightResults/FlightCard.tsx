// components/FlightResults/FlightCard.tsx
import { useState } from "react";
import { FlightCardHeader } from "./FlightCardHeader";
import { FlightCardContent } from "./FlightCardContent";
import { LoadingDots } from "./LoadingDots";
import { FlightExpandedDetails } from "./FlightExpandedDetails";
import Button from "../common/Button";
import type { Flight } from "../../types";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div
      className={`border rounded-lg ${
        isExpanded ? "border-gray-200 shadow-none" : "border-gray-200"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-sm transition-all duration-300  ${
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
            <p className="text-xs">1 Deal</p>
            <p>${flight.price}</p>
          </div>
          <Button variant="secondary" className="px-14" size="lg">
            Choose
          </Button>
        </div>
      )}
    </div>
  );
};
