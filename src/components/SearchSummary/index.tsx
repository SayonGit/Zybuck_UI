import FlightForm from "../booking/FlightForm";
import HotelStayForm from "../booking/HotelForm";
import CarSearchForm from "../booking/CarForm";

interface SearchSummaryProps {
  searchType: string;
}

export const SearchSummary = ({ searchType }: SearchSummaryProps) => {
  const renderSummary = () => {
    switch (searchType) {
      case "flight":
        return <FlightForm />;
      case "hotel":
        return <HotelStayForm />;
      case "car":
        return <CarSearchForm />;
      default:
        return <FlightForm />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {renderSummary()}
    </div>
  );
};
