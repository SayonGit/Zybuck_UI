import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import InputField from "../../common/InputField";
import Button from "../../common/Button";
import DropdownField from "../../common/Dropdown";
import styles from "./HotelFormStyle.module.scss";
import UseHotelForm from "../../../hooks/useHotelStayForm";
import {
  setHotelLoading,
  updateHotelFormData,
  updateHotelPassengerCount,
} from "../../../store/slices/hoteStaySlice";

const HotelStayForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { formData, isLoading } = UseHotelForm();

  const guestsCitizenshipOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "in", label: "India" },
    { value: "cn", label: "China" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
    { value: "mx", label: "Mexico" },
    { value: "it", label: "Italy" },
    { value: "es", label: "Spain" },
    { value: "nl", label: "Netherlands" },
    { value: "ch", label: "Switzerland" },
    { value: "se", label: "Sweden" },
    { value: "no", label: "Norway" },
    { value: "dk", label: "Denmark" },
    { value: "fi", label: "Finland" },
    { value: "be", label: "Belgium" },
    { value: "at", label: "Austria" },
    { value: "ie", label: "Ireland" },
    { value: "nz", label: "New Zealand" },
    { value: "sg", label: "Singapore" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "kr", label: "South Korea" },
    { value: "th", label: "Thailand" },
    { value: "my", label: "Malaysia" },
    { value: "ph", label: "Philippines" },
    { value: "id", label: "Indonesia" },
    { value: "vn", label: "Vietnam" },
    { value: "za", label: "South Africa" },
    { value: "eg", label: "Egypt" },
    { value: "ng", label: "Nigeria" },
    { value: "ar", label: "Argentina" },
    { value: "cl", label: "Chile" },
    { value: "co", label: "Colombia" },
    { value: "pe", label: "Peru" },
    { value: "tr", label: "Turkey" },
    { value: "ru", label: "Russia" },
    { value: "pl", label: "Poland" },
    { value: "cz", label: "Czech Republic" },
    { value: "hu", label: "Hungary" },
    { value: "gr", label: "Greece" },
    { value: "pt", label: "Portugal" },
    { value: "il", label: "Israel" },
    { value: "other", label: "Other" },
  ];

  const starRatingOptions = [
    { value: "any", label: "Any rating" },
    { value: "2", label: "2 stars" },
    { value: "3", label: "3 stars" },
    { value: "4", label: "4 stars" },
    { value: "5", label: "5 stars" },
  ];

  const earlyCheckinoutTimeOptions = [
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
  ];

  const roomTypeOptions = ["RO", "BB", "HB", "FB", "AI"];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setHotelLoading(true));

    setTimeout(() => {
      console.log("=== HOTEL SEARCH FORM SUBMISSION ===");
      console.log("Form Data:", formData);
      console.log("Total Guests:", formData.adults + formData.children);
      console.log("=====================================");

      dispatch(setHotelLoading(false));
      alert("Hotel search submitted! Check console for details.");
    }, 2000);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm"
    >
      {/* Main Search Section */}
      <div className="flex flex-col gap-2 mb-6">
        {/* Primary Search Row - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
          {/* Destination Field - Takes more space on desktop */}
          <div className="w-full lg:flex-1 lg:max-w-md">
            <InputField
              className="w-full h-input"
              label="Going to"
              value={formData.destination}
              placeholder="City, hotel, place to go"
              onChange={(value) =>
                dispatch(updateHotelFormData({ destination: value }))
              }
            />
          </div>

          {/* Dates Section - Side by side on desktop, stacked on mobile */}
          <div className="w-full lg:w-auto">
            {/* Desktop: Side by side dates */}
            <div className="hidden lg:block">
              <div className="flex gap-0 h-input border b-clr rounded-lg overflow-hidden">
                <div className="flex-1 relative border-r b-clr">
                  <InputField
                    className={`flex-1 h-input ${styles["date-input-no-icon"]}`}
                    label="Check In"
                    type="date"
                    isDouble={true}
                    value={formData.checkInDate}
                    onChange={(value) =>
                      dispatch(updateHotelFormData({ checkInDate: value }))
                    }
                  />
                </div>
                <div className="flex-1 relative">
                  <InputField
                    className={`flex-1 h-input ${styles["date-input-no-icon"]}`}
                    label="Check Out"
                    type="date"
                    isDouble={true}
                    value={formData.checkOutDate}
                    onChange={(value) =>
                      dispatch(updateHotelFormData({ checkOutDate: value }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Mobile/Tablet: Stacked dates */}
            <div className="lg:hidden flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <InputField
                  className={`w-full h-input ${styles["date-input-no-icon"]}`}
                  label="Check In"
                  type="date"
                  value={formData.checkInDate}
                  onChange={(value) =>
                    dispatch(updateHotelFormData({ checkInDate: value }))
                  }
                />
              </div>
              <div className="flex-1">
                <InputField
                  className={`w-full h-input ${styles["date-input-no-icon"]}`}
                  label="Check Out"
                  type="date"
                  value={formData.checkOutDate}
                  onChange={(value) =>
                    dispatch(updateHotelFormData({ checkOutDate: value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Counters Section - Responsive layout */}
          <div className="flex flex-col sm:flex-row lg:flex-row gap-2 lg:w-auto">
            {/* Rooms Counter */}
            <div className="w-full sm:w-auto lg:w-20">
              <div className="flex flex-col items-center justify-center border border-[#D2D2D2] rounded-lg h-input">
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-600 mb-1">
                  Rooms
                </span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateHotelPassengerCount({
                          type: "rooms",
                          increment: false,
                        })
                      )
                    }
                    className="p-1 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-3 h-3"
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
                  <span className="w-4 text-center text-sm font-semibold">
                    {formData.rooms}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateHotelPassengerCount({
                          type: "rooms",
                          increment: true,
                        })
                      )
                    }
                    className="p-1 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-3 h-3"
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

            {/* Guests Counters */}
            <div className="flex gap-2 flex-1 sm:flex-none lg:flex-none">
              {(["adults", "children"] as const).map((type) => (
                <div key={type} className="flex-1 sm:w-20 lg:w-20">
                  <div className="flex flex-col items-center justify-center border border-[#D2D2D2] rounded-lg h-input">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-600 capitalize mb-1">
                      {type}
                    </span>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateHotelPassengerCount({
                              type,
                              increment: false,
                            })
                          )
                        }
                        className="p-1 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-3 h-3"
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
                      <span className="w-4 text-center text-sm font-semibold">
                        {formData[type]}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateHotelPassengerCount({ type, increment: true })
                          )
                        }
                        className="p-1 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-3 h-3"
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
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="material-symbols:search"
              iconPosition="left"
              fullWidth={false}
              loading={isLoading}
              className="h-input w-full lg:w-auto lg:min-w-[160px]"
            >
              {isLoading ? "Searching..." : "Search Hotels"}
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Parameters Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Additional Parameters
        </h4>

        {/* First Row: Citizenship and Star Rating */}
        <div className="flex flex-col lg:flex-row gap-2 mb-4">
          {/* Citizenship Dropdown */}
          <div className="w-full lg:w-1/3">
            <DropdownField
              className="w-full"
              label="Guests' citizenship"
              value={formData.guestsCitizenship}
              options={guestsCitizenshipOptions}
              onChange={(value) =>
                dispatch(updateHotelFormData({ guestsCitizenship: value }))
              }
              placeholder="Choose your citizenship"
              searchable={true}
            />
          </div>

          {/* Star Rating Buttons */}
          <div className="w-full lg:flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 rounded-lg border b-clr overflow-hidden">
              {starRatingOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  className={`h-input px-2 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center cursor-pointer hover:bg-gray-50
                    ${
                      index < starRatingOptions.length - 1
                        ? "border-r border-r-[#D2D2D2]"
                        : ""
                    }
                  `}
                  onClick={() =>
                    dispatch(updateHotelFormData({ starRating: option.value }))
                  }
                >
                  <span
                    className={
                      formData.starRating === option.value
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
        </div>

        {/* Second Row: Room Type, Check-in/out Times, and Free Cancellation */}
        <div className="flex flex-col xl:flex-row gap-2">
          {/* Room Type Buttons */}
          <div className="w-full xl:w-1/3">
            <div className="grid grid-cols-3 sm:grid-cols-5 rounded-lg border b-clr overflow-hidden">
              {roomTypeOptions.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`h-input px-2 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center cursor-pointer hover:bg-gray-50
                    ${
                      index < roomTypeOptions.length - 1
                        ? "border-r border-r-[#D2D2D2]"
                        : ""
                    }
                  `}
                  onClick={() =>
                    dispatch(updateHotelFormData({ roomType: option }))
                  }
                >
                  <span
                    className={
                      formData.roomType === option
                        ? "border-b-4 pb-1 border-b-[#FFD9A3] font-extrabold"
                        : ""
                    }
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Check-in/out Times and Cancellation */}
          <div className="w-full xl:flex-1 flex flex-col sm:flex-row gap-2">
            {/* Early Check-in */}
            <div className="w-full sm:w-1/3">
              <DropdownField
                className="w-full"
                label="Early Check-in"
                value={formData.earlyCheckInDate}
                options={earlyCheckinoutTimeOptions}
                onChange={(value) =>
                  dispatch(updateHotelFormData({ earlyCheckInDate: value }))
                }
                placeholder="Select time"
              />
            </div>

            {/* Early Check-out */}
            <div className="w-full sm:w-1/3">
              <DropdownField
                className="w-full"
                label="Early Check-out"
                value={formData.earlyCheckOutDate}
                options={earlyCheckinoutTimeOptions}
                onChange={(value) =>
                  dispatch(updateHotelFormData({ earlyCheckOutDate: value }))
                }
                placeholder="Select time"
              />
            </div>

            {/* Free Cancellation Checkbox */}
            <div className="w-full sm:w-1/3 flex items-end pb-2">
              <div className="flex items-center h-input">
                <input
                  id="free-cancellation"
                  type="checkbox"
                  checked={formData.freeCancellation || false}
                  onChange={(e) =>
                    dispatch(
                      updateHotelFormData({
                        freeCancellation: e.target.checked,
                      })
                    )
                  }
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <label
                  htmlFor="free-cancellation"
                  className="ml-2 text-sm font-medium text-gray-600 cursor-pointer"
                >
                  Free cancellation
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HotelStayForm;
