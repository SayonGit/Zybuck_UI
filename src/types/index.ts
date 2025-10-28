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
  airport: string;
  duration: string;
  arrivalTime: string;
  departureTime: string;
}

export interface Baggage {
  cabin: string;
  checkin: string;
}
export interface Flight {
  id: number;
  airline: string;
  logo?: string;
  route: string;
  departure: string;
  arrival: string;
  duration: string;
  durationMinutes: number;

  from: string;
  to: string;
  travelDate: string;
  arrivalDate: string;
  airlineCode: string;

  stops: number;
  stopDetails: StopDetail[];

  price: string;
  priceDetails: PriceDetails;

  flightNumber: string;
  aircraft: string;
  bookingClass: string;
  dealType: string;

  baggage: Baggage;
  amenities: Amenities;
  seatConfiguration: string;

  totalLayoverTime?: string;

  roundTrip?: Flight | null;
}

export interface StopDetail {
  leg: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirport: string;
  arrivalAirport: string;
  carrierCode: string;
  flightNumber: string;
  terminal: {
    departure?: string;
    arrival?: string;
  };
  segmentIndex: number;
}

export interface PriceDetails {
  currency: string;
  base: number;
  total: number;
  grandTotal: number;
  travelerPricings: TravelerPricing[];
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  brandedFareLabel: string;
  class: string;
  includedCheckedBags: { quantity: number };
  includedCabinBags: { quantity: number };
  amenities: FareAmenity[];
}

export interface FareAmenity {
  description: string;
  isChargeable: boolean;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
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
}
