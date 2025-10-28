import { formatDate } from "@/services/globalServices";
import type { Flight } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface FlightInfoProps {
  flightDetails: Flight;
}

const FlightInfo = ({ flightDetails }: FlightInfoProps) => {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="p-4 flex gap-4 items-center bg-[#f3f9fe]">
        <div className="border rounded-full w-12 h-12 p-1">
          <img
            src={flightDetails.logo?.replace("/alt", "")}
            alt={flightDetails.airline}
            className="w-full h-full object-contain rounded-full "
          />
        </div>
        <h3 className="font-semibold">Departure </h3>
        <p>{flightDetails.aircraft}</p>
        <p className="ml-auto">
          {formatDate(new Date(flightDetails.travelDate))}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 items-start gap-6 p-4 sm:p-5">
        {/* Left: Departure */}
        <div className="space-y-1">
          <h2 className="font-bold text-gray-600 text-2xl">
            {flightDetails.departure}{" "}
            <span className="font-normal">
              {flightDetails.route?.split("-")[0]}
            </span>
          </h2>
          {/* <p className="text-xs text-zinc-500">{dateLabel}</p> */}
          <p className="text-sm text-zinc-600">
            {formatDate(new Date(flightDetails.travelDate))}
          </p>
          <p className="text-sm text-zinc-600 max-w-1/4">
            {flightDetails.from}
          </p>
        </div>

        <div className="my-4 flex items-center justify-center">
          <div className="h-px w-1/4 bg-zinc-200" />
          <div className="flex w-full bg-gray-100 justify-center items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 shadow-sm">
            <span>{flightDetails.duration}</span>
            <Icon
              icon="mdi:airplane"
              className="rotate-45 text-blue-400 text-lg"
            />
            <span>
              {!flightDetails.stops ? "Direct" : flightDetails.stops + " stop"}
            </span>
          </div>
          <div className="h-px w-1/4 bg-zinc-200" />
        </div>

        {/* Right: Arrival */}
        <div className="space-y-1 sm:text-right">
          <h2 className="font-bold text-gray-600 text-2xl">
            {flightDetails.arrival}{" "}
            <span className="font-normal">
              {flightDetails.route?.split("-")[1]}
            </span>
          </h2>
          {/* <p className="text-xs text-zinc-500">{dateLabel}</p> */}
          <p className="text-sm text-zinc-600">
            {formatDate(new Date(flightDetails.arrivalDate))}
          </p>
          <p className="text-sm text-zinc-600 max-w-1/4 ms-auto">
            {flightDetails.to}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlightInfo;
