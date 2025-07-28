import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateFormData,
  updateSelectedTrip,
  updateSelectedAirline,
  setLoading,
  TripOption,
} from "../../../store/slices/flightSearchSlice";
import TripOptions from "../TripOptions";
import Button from "../../common/Button";
import DropdownField from "../../common/Dropdown";
import UseFlightForm from "../../../hooks/useFlightForm";
import PassengerCounters from "./PassengerCounters";
import SingleTripForm from "./SingleTripForm";
import MultipleDestinationForm from "./MultipleDestinationForm";
import { useAppData } from "../../../hooks/useAppData";

const FlightForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formData, selectedTrip, selectedAirline, isLoading } =
    UseFlightForm();

  // Get data from Redux store
  const { flightClassOptions, airlineOptions } = useAppData();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    // Create URL search parameters from form data
    const searchParams = new URLSearchParams();

    // Add form data to search parameters
    searchParams.set("from", formData.from || "");
    searchParams.set("to", formData.to || "");
    searchParams.set("departDate", formData.departDate || "");
    if (formData.returnDate) {
      searchParams.set("returnDate", formData.returnDate);
    }
    searchParams.set("adults", formData.adults.toString());
    searchParams.set("children", formData.children.toString());
    searchParams.set("infants", formData.infants.toString());
    searchParams.set("tripType", selectedTrip);
    searchParams.set("class", formData.class);
    searchParams.set("airline", selectedAirline);

    // Navigate to search page with query parameters
    navigate(`/search?${searchParams.toString()}`);

    // Reset loading state after a short delay
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm"
    >
      {/* Trip Options */}
      <TripOptions
        selectedTrip={selectedTrip}
        onTripChange={(trip: TripOption) => dispatch(updateSelectedTrip(trip))}
      />

      {/* Conditional Form Layout */}
      {selectedTrip === TripOption.multipleDestination ? (
        <MultipleDestinationForm />
      ) : (
        <div className="flex-col md:flex-row gap-2 mb-6 flex">
          <SingleTripForm selectedTrip={selectedTrip} />
          <PassengerCounters selectedTrip={selectedTrip} />
        </div>
      )}

      {/* Class Selection and Actions */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* Class Selection */}
        <div className="w-full md:w-[64%]">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-lg border b-clr overflow-hidden">
            {flightClassOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={`h-input px-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center cursor-pointer hover:bg-gray-50
                  ${
                    index < flightClassOptions.length - 1 && index !== 1
                      ? "border-r border-r-[#D2D2D2]"
                      : ""
                  }
                  ${index === 1 ? "border-r border-r-[#D2D2D2]" : ""}
                  ${index === 2 && "md:border-r md:border-r-[#D2D2D2]"}
                `}
                onClick={() =>
                  dispatch(
                    updateFormData({
                      class: option.value as any,
                    })
                  )
                }
              >
                <span
                  className={
                    formData.class === option.value
                      ? "border-b-4 pb-1 border-b-[#FFD9A3] font-extrabold"
                      : ""
                  }
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Airline and Search Button */}
        <div className="flex flex-col md:flex-row md:w-[36%] gap-2 items-end">
          <div className="w-full md:w-[50%] md:flex-1 max-w-sm">
            <DropdownField
              className="w-full"
              label="Airline"
              value={selectedAirline}
              options={airlineOptions}
              onChange={(value) => dispatch(updateSelectedAirline(value))}
              placeholder="Select airline"
            />
          </div>

          <div className="w-full md:w-[50%]">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="lets-icons:send-fill"
              iconPosition="left"
              fullWidth={false}
              loading={isLoading}
              className="h-input w-full md:min-w-[160px]"
            >
              {isLoading ? "Searching..." : "Show Flights"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FlightForm;
