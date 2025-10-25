import type { Flight } from "../../types";
import { FlightDetailsDesktop } from "./FlightDetailsDesktop";
import { FlightDetailsMobile } from "./FlightDetailsMobile";

interface FlightExpandedDetailsProps {
  flight: Flight;
}

export const FlightExpandedDetails = ({
  flight,
}: FlightExpandedDetailsProps) => {
  return (
    <>
      <div className="border-t bg-white rounded-lg shadow-md border-gray-200 m-3 pt-6 p-3 sm:p-6 animate-fade-in">
        <FlightDetailsDesktop flight={flight} />
        <FlightDetailsMobile flight={flight} />
      </div>
      {flight.roundTrip && (
        <div className="border-t bg-white rounded-lg shadow-md border-gray-200 m-3 pt-6 p-3 sm:p-6 animate-fade-in">
          <FlightDetailsDesktop flight={flight.roundTrip} />
          <FlightDetailsMobile flight={flight.roundTrip} />
        </div>
      )}
    </>
  );
};
