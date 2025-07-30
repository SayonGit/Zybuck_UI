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

export interface StopDetail {
  stopNumber: number;
  airport: string;
  city: string;
  arrivalTime: string;
  departureTime: string;
  layoverDuration: string;
  terminal: string;
}

export interface Baggage {
  checkedBaggage: string;
  carryOn: string;
}

export interface Amenities {
  wifi: boolean;
  entertainment: boolean;
  meals: boolean;
  powerOutlets: boolean;
  streaming: boolean;
  snacks: boolean;
  blanket: boolean;
  priorityBoarding?: boolean;
  amenityKit?: boolean;
}

export interface Flight {
  id: number;
  airline: string;
  logo: any;
  departure: string;
  arrival: string;
  duration: string;
  route: string;
  from: string;
  to: string;
  travelDate: Date;
  stops: number | null;
  price: number;
  flightNumber: string;
  dealType: string;
  aircraft: string;
  bookingClass: string;
  layoverTime?: string;
  totalLayoverTime?: string;
  stopDetails?: StopDetail[];
  baggage: Baggage;
  amenities: Amenities;
  seatConfiguration: string;
}
