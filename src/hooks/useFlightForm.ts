import { useAppSelector } from "../store/hooks";

const UseFlightForm = () => {
  const { formData, selectedTrip, selectedAirline, isLoading } = useAppSelector(
    (state) => state.flightSearch
  );
  return {
    formData,
    selectedTrip,
    selectedAirline,
    isLoading,
  };
};

export default UseFlightForm;
