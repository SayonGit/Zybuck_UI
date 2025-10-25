import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { formData, selectedTrip, selectedAirline, isLoading } =
    UseFlightForm();
  const { flightClassOptions, airlineOptions } = useAppData();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.size === 0) return;
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const departDate = params.get("departDate") || "";
    const returnDate = params.get("returnDate") || "";
    const adults = Number(params.get("adults")) || 1;
    const children = Number(params.get("children")) || 0;
    const infants = Number(params.get("infants")) || 0;
    const tripType =
      (params.get("tripType") as TripOption) || TripOption.oneWay;
    const flightClass = params.get("class") || "Economy";
    const airline = params.get("airline") || "";

    // Update Redux with URL data
    dispatch(
      updateFormData({
        from,
        to,
        departDate,
        returnDate,
        adults,
        children,
        infants,
        class: flightClass as any,
      })
    );
    dispatch(updateSelectedTrip(tripType));
    dispatch(updateSelectedAirline(airline));
  }, [location.search, dispatch]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const searchParams = new URLSearchParams({
      from: formData.from || "",
      to: formData.to || "",
      departDate: formData.departDate || "",
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      infants: formData.infants.toString(),
      tripType: selectedTrip,
      class: formData.class,
      airline: selectedAirline,
    });

    if (formData.returnDate && selectedTrip === TripOption.roundTrip) {
      searchParams.set("returnDate", formData.returnDate);
    } else {
      searchParams.delete("returnDate");
    }

    navigate(`/search?${searchParams.toString()}`);

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
                onClick={() => {
                  dispatch(
                    updateFormData({
                      class: option.value as any,
                    })
                  );
                }}
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

        {/* Airline + Search */}
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
