import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { updatePassengerCount } from "../../../store/slices/flightSearchSlice";
import UseFlightForm from "../../../hooks/useFlightForm";

interface PassengerCountersProps {
  selectedTrip: string;
}

const PassengerCounters: React.FC<PassengerCountersProps> = ({
  selectedTrip,
}) => {
  const dispatch = useAppDispatch();
  const { formData } = UseFlightForm();

  const totalPassengers =
    formData.adults + formData.children + formData.infants;

  const handleIncrement = (type: "adults" | "children" | "infants") => {
    if (totalPassengers >= 9) return; // prevent adding more than 9 total
    dispatch(updatePassengerCount({ type, increment: true }));
  };

  const handleDecrement = (type: "adults" | "children" | "infants") => {
    dispatch(updatePassengerCount({ type, increment: false }));
  };

  return (
    <div
      className={`flex flex-col sm:flex-row md:flex-row gap-2 w-full ${
        selectedTrip === "multipleDestination"
          ? "md:w-[30%]"
          : selectedTrip === "roundTrip"
          ? "md:w-[20%]"
          : "md:w-[30%]"
      }`}
    >
      {(["adults", "children", "infants"] as const).map((type) => (
        <div key={type} className="w-full sm:w-1/3 md:w-full">
          <div className="flex flex-col items-center justify-center border b-clr rounded-lg h-input">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-600 capitalize mb-1">
              {type}
            </span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleDecrement(type)}
                className="p-1 rounded transition-colors cursor-pointer"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="w-4 sm:w-6 text-center text-sm sm:text-base font-semibold">
                {formData[type]}
              </span>
              <button
                type="button"
                onClick={() => handleIncrement(type)}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  totalPassengers >= 9 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={totalPassengers >= 9}
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PassengerCounters;
