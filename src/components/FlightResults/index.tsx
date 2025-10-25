import type { Flight } from "@/types";
import { FlightCard } from "./FlightCard";

interface FlightResultsProps {
  sortBy: string;
  searchParams: URLSearchParams;
  flightData?: Flight[];
}

export const FlightResults = ({ flightData }: FlightResultsProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {flightData?.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};
