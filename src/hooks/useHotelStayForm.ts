// src/hooks/useHotelForm.ts
import { useAppSelector } from "../store/hooks";

const UseHotelForm = () => {
  const { formData, isLoading, searchResults } = useAppSelector(
    (state) => state.hotelSearch
  );

  return {
    formData,
    isLoading,
    searchResults,
  };
};

export default UseHotelForm;
