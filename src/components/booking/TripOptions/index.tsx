import React from "react";
import { TripOption } from "../../../store/slices/flightSearchSlice";

interface TripOptionsProps {
  selectedTrip: string;
  onTripChange: (trip: TripOption) => void;
}

const TripOptions: React.FC<TripOptionsProps> = ({
  selectedTrip,
  onTripChange,
}) => {
  const options = [
    { id: TripOption.oneWay, label: "One way" },
    { id: TripOption.roundTrip, label: "Round Trip" },
    { id: TripOption.multipleDestination, label: "Multiple Destination" },
  ];

  return (
    <div className="mb-6">
      {/* Single layout that changes responsively */}
      <div className="grid grid-cols-2 md:flex md:gap-8 gap-2 place-items-center">
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`flex justify-center ${
              index === 2 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value={option.id}
                checked={selectedTrip === option.id}
                onChange={(e) => onTripChange(e.target.value as TripOption)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700 text-sm md:text-base md:font-medium">
                {option.label}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripOptions;
