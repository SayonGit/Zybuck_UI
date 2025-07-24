export interface FlightSearchData {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  tripType: "oneWay" | "roundTrip" | "multipleDestination";
  class: "economy" | "premiumEconomy" | "business" | "firstClass";
  airline: string;
}

export interface ServiceFeature {
  element: React.FC;
  title: string;
  description: string;
  stats?: string;
}
