// src/components/booking/CarSearchForm/index.tsx
import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateCarFormData,
  setCarLoading,
  toggleSameDropoffLocation,
  syncDropoffLocation,
} from "../../../store/slices/carSearchSlice";
import InputField from "../../common/InputField";
import Button from "../../common/Button";
import DropdownField from "../../common/Dropdown";
import UseCarForm from "../../../hooks/useCarForm";

const CarSearchForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData,
    isLoading,
    isSameDropoffLocation,
    isFormValid,
    getRentalDuration,
    getMinDropoffDate,
  } = UseCarForm();

  const timeOptions = [
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
  ];

  const carTypeOptions = [
    { value: "any", label: "Any car type" },
    { value: "economy", label: "Economy" },
    { value: "compact", label: "Compact" },
    { value: "intermediate", label: "Intermediate" },
    { value: "standard", label: "Standard" },
    { value: "fullsize", label: "Full Size" },
    { value: "luxury", label: "Luxury" },
    { value: "suv", label: "SUV" },
  ];

  const driverAgeOptions = [
    { value: "18-24", label: "18-24 years" },
    { value: "25-65", label: "25-65 years" },
    { value: "65+", label: "65+ years" },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all required fields");
      return;
    }

    dispatch(setCarLoading(true));

    setTimeout(() => {
      console.log("=== CAR SEARCH FORM SUBMISSION ===");
      console.log("Form Data:", formData);
      console.log("Same dropoff location:", isSameDropoffLocation);
      console.log("Rental duration:", getRentalDuration());
      console.log("=====================================");

      dispatch(setCarLoading(false));
      alert("Car search submitted! Check console for details.");
    }, 2000);
  };

  const handlePickupLocationChange = (value: string) => {
    dispatch(updateCarFormData({ pickupLocation: value }));
    // Sync dropoff location if same location is enabled
    dispatch(syncDropoffLocation());
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm"
    >
      {/* Main Search Section */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Location Fields */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Pickup Location */}
          <div className="w-full lg:flex-1">
            <InputField
              className="w-full h-input"
              label="Pickup location"
              value={formData.pickupLocation}
              placeholder="Enter pickup location"
              onChange={handlePickupLocationChange}
            />
          </div>

          {/* Dropoff Location */}
          <div className="w-full lg:flex-1">
            <InputField
              className="w-full h-input"
              label="Dropoff location"
              value={formData.dropoffLocation}
              placeholder="Enter dropoff location"
              disabled={isSameDropoffLocation}
              onChange={(value) =>
                dispatch(updateCarFormData({ dropoffLocation: value }))
              }
            />
          </div>
        </div>

        {/* Same Location Checkbox */}
        <div className="flex items-center">
          <input
            id="same-location"
            type="checkbox"
            checked={isSameDropoffLocation}
            onChange={() => dispatch(toggleSameDropoffLocation())}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label
            htmlFor="same-location"
            className="ml-2 text-sm font-medium text-gray-600 cursor-pointer"
          >
            Return to same location
          </label>
        </div>

        {/* Date and Time Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pickup Date */}
          <InputField
            className="w-full h-input date-input-no-icon"
            label="Pickup date"
            type="date"
            value={formData.pickupDate}
            // min={new Date().toISOString().split('T')[0]}
            onChange={(value) =>
              dispatch(updateCarFormData({ pickupDate: value }))
            }
          />

          {/* Pickup Time */}
          <DropdownField
            className="w-full"
            label="Pickup time"
            value={formData.pickupTime}
            options={timeOptions}
            onChange={(value) =>
              dispatch(updateCarFormData({ pickupTime: value }))
            }
          />

          {/* Dropoff Date */}
          <InputField
            className="w-full h-input date-input-no-icon"
            label="Dropoff date"
            type="date"
            value={formData.dropoffDate}
            // min={getMinDropoffDate()}
            onChange={(value) =>
              dispatch(updateCarFormData({ dropoffDate: value }))
            }
          />

          {/* Dropoff Time */}
          <DropdownField
            className="w-full"
            label="Dropoff time"
            value={formData.dropoffTime}
            options={timeOptions}
            onChange={(value) =>
              dispatch(updateCarFormData({ dropoffTime: value }))
            }
          />
        </div>

        {/* Additional Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <DropdownField
              className="w-full"
              label="Driver age"
              value={formData.driverAge}
              options={driverAgeOptions}
              onChange={(value) =>
                dispatch(updateCarFormData({ driverAge: value }))
              }
            />
          </div>

          <div className="flex-1">
            <DropdownField
              className="w-full"
              label="Car type"
              value={formData.carType}
              options={carTypeOptions}
              onChange={(value) =>
                dispatch(updateCarFormData({ carType: value }))
              }
            />
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-auto">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="material-symbols:directions-car"
              iconPosition="left"
              fullWidth={false}
              loading={isLoading}
              disabled={!isFormValid()}
              className="h-input w-full sm:w-auto sm:min-w-[160px]"
            >
              {isLoading ? "Searching..." : "Search Cars"}
            </Button>
          </div>
        </div>

        {/* Rental Duration Display */}
        {getRentalDuration() && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <span className="font-medium">Rental Duration:</span>{" "}
            {getRentalDuration()?.days} days ({getRentalDuration()?.totalHours}{" "}
            hours)
          </div>
        )}
      </div>
    </form>
  );
};

export default CarSearchForm;
