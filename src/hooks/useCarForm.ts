// src/hooks/useCarForm.ts
import { useAppSelector } from "../store/hooks";

const UseCarForm = () => {
  const { formData, isLoading, searchResults, isSameDropoffLocation } =
    useAppSelector((state) => state.carSearch);

  // Helper function to check if form is valid
  const isFormValid = () => {
    const {
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      dropoffLocation,
    } = formData;

    const baseValidation =
      pickupLocation && pickupDate && pickupTime && dropoffDate && dropoffTime;

    if (isSameDropoffLocation) {
      return baseValidation;
    } else {
      return baseValidation && dropoffLocation;
    }
  };

  // Helper function to calculate rental duration
  const getRentalDuration = () => {
    if (!formData.pickupDate || !formData.dropoffDate) {
      return null;
    }

    const pickupDateTime = new Date(
      `${formData.pickupDate}T${formData.pickupTime}`
    );
    const dropoffDateTime = new Date(
      `${formData.dropoffDate}T${formData.dropoffTime}`
    );

    const diffTime = dropoffDateTime.getTime() - pickupDateTime.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    return {
      days: diffDays,
      hours: diffHours,
      totalHours: diffHours,
    };
  };

  // Helper function to get minimum dropoff date (should be same or after pickup)
  const getMinDropoffDate = () => {
    return formData.pickupDate || new Date().toISOString().split("T")[0];
  };

  return {
    formData,
    isLoading,
    searchResults,
    isSameDropoffLocation,
    isFormValid,
    getRentalDuration,
    getMinDropoffDate,
  };
};

export default UseCarForm;
