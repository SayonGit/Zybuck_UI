import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateCarFormData,
  setCarLoading,
  syncDropoffLocation,
} from "../../../store/slices/carSearchSlice";
import InputField from "../../common/InputField";
import Button from "../../common/Button";
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
    getTodayDate,
  } = UseCarForm();

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
    dispatch(syncDropoffLocation());
  };

  const handlePickupDateChange = (value: string) => {
    dispatch(updateCarFormData({ pickupDate: value }));

    // Auto-adjust dropoff date if it's before pickup date
    if (formData.dropoffDate && value > formData.dropoffDate) {
      dispatch(updateCarFormData({ dropoffDate: value }));
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Location Fields - Stack on mobile, side by side on tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Pickup Location */}
          <div className="lg:col-span-1">
            <InputField
              className="w-full h-input"
              label="Pickup location"
              value={formData.pickupLocation}
              placeholder="Enter pickup location"
              onChange={handlePickupLocationChange}
            />
          </div>

          {/* Dropoff Location */}
          <div className="lg:col-span-1">
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

          {/* Pickup Date & Time */}
          <div className="lg:col-span-1">
            <div className="flex gap-0 h-input border b-clr rounded-lg overflow-hidden">
              <div className="flex-1 relative border-r b-clr">
                <InputField
                  className="flex-1 h-input"
                  label="Pickup Date"
                  type="date"
                  value={formData.pickupDate}
                  min={getTodayDate()}
                  isDouble={true}
                  onChange={handlePickupDateChange}
                />
              </div>
              <div className="flex-1 relative">
                <InputField
                  className="flex-1 h-input"
                  label="Time"
                  type="time"
                  isDouble={true}
                  value={formData.pickupTime || ""}
                  onChange={(value) =>
                    dispatch(updateCarFormData({ pickupTime: value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Dropoff Date & Time */}
          <div className="lg:col-span-1">
            <div className="flex gap-0 h-input border b-clr rounded-lg overflow-hidden">
              <div className="flex-1 relative border-r b-clr">
                <InputField
                  className="flex-1 h-input"
                  label="Drop-off Date"
                  type="date"
                  value={formData.dropoffDate}
                  min={getMinDropoffDate()}
                  isDouble={true}
                  onChange={(value) =>
                    dispatch(updateCarFormData({ dropoffDate: value }))
                  }
                />
              </div>
              <div className="flex-1 relative">
                <InputField
                  className="flex-1 h-input"
                  label="Time"
                  type="time"
                  isDouble={true}
                  value={formData.dropoffTime || ""}
                  onChange={(value) =>
                    dispatch(updateCarFormData({ dropoffTime: value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Driver Age & Search Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start sm:items-center">
          {/* Driver's Age Checkbox */}
          <div className="flex items-center h-input order-2 sm:order-1">
            <input
              id="drivers-age"
              type="checkbox"
              checked={formData.driversAge || false}
              onChange={(e) =>
                dispatch(
                  updateCarFormData({
                    driversAge: e.target.checked,
                  })
                )
              }
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mr-2"
            />
            <label
              htmlFor="drivers-age"
              className="text-sm font-medium text-gray-600 cursor-pointer select-none"
            >
              Driver's age: 26 - 69 years
            </label>
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-auto order-1 sm:order-2">
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
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-2">
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
