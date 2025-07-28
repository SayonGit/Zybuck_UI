interface HotelSummaryProps {
  searchParams: URLSearchParams;
}

export const HotelSummary = ({ searchParams }: HotelSummaryProps) => {
  // Implementation similar to FlightSummary but for hotels
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Hotel Search</h2>
      {/* Hotel-specific search form */}
    </div>
  );
};
