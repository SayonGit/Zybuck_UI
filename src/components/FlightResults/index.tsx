import {
  AirIndiaFullLogo,
  AmericanExpressFullLogo,
  BritishAirwaysFullLogo,
  EmiratesFullLogo,
  QatarAirwaysFullLogo,
} from "../../assets";
import { FlightCard } from "./FlightCard";

interface FlightResultsProps {
  sortBy: string;
  searchParams: URLSearchParams;
}

export const FlightResults = ({}: FlightResultsProps) => {
  const mockFlights = [
    {
      id: 1,
      airline: "Emirates",
      logo: EmiratesFullLogo,
      departure: "02:10 am",
      arrival: "07:45 am",
      duration: "8h 45m",
      route: "DEL - LHR",
      from: "Indira Gandhi International Airport (DEL)",
      to: "London Heathrow Airport (LHR)",
      travelDate: new Date("2025-08-15"),
      stops: null, // Direct flight
      price: 75420.5, // INR
      flightNumber: "EK 511",
      aircraft: "Boeing 777-300ER",
      bookingClass: "Economy",
      dealType: "Best",
      baggage: {
        checkedBaggage: "30kg",
        carryOn: "7kg",
      },
      amenities: {
        wifi: true,
        entertainment: true,
        meals: true,
        powerOutlets: true,
        streaming: true,
        snacks: true,
        blanket: true,
      },
      seatConfiguration: "3-4-3",
    },
    {
      id: 2,
      airline: "British Airways",
      logo: BritishAirwaysFullLogo,
      departure: "11:30 pm",
      arrival: "01:25 pm+1", // Next day
      duration: "12h 25m",
      route: "DEL - LHR",
      from: "Indira Gandhi International Airport (DEL)",
      to: "London Heathrow Airport (LHR)",
      travelDate: new Date("2025-08-15"),
      stops: 1,
      price: 68750.25, // INR
      flightNumber: "LH 761 / LH 901",
      aircraft: "Airbus A340-600 / Boeing 747-8",
      bookingClass: "Economy",
      dealType: "Cheapest",
      layoverTime: "2h 45m",
      stopDetails: [
        {
          stopNumber: 1,
          airport: "Frankfurt Airport (FRA)",
          city: "Frankfurt, Germany",
          arrivalTime: "05:15 am",
          departureTime: "08:00 am",
          layoverDuration: "2h 45m",
          terminal: "Terminal 1",
        },
      ],
      baggage: {
        checkedBaggage: "23kg",
        carryOn: "8kg",
      },
      amenities: {
        wifi: true,
        entertainment: true,
        meals: true,
        powerOutlets: false,
        streaming: false,
        snacks: true,
        blanket: true,
      },
      seatConfiguration: "3-3-3",
    },
    {
      id: 3,
      airline: "Air India",
      logo: AirIndiaFullLogo,
      departure: "08:45 am",
      arrival: "11:30 pm",
      duration: "15h 15m",
      route: "DEL - LHR",
      from: "Indira Gandhi International Airport (DEL)",
      to: "London Heathrow Airport (LHR)",
      travelDate: new Date("2025-08-15"),
      stops: 2,
      dealType: "Recommended",
      price: 52340.8, // INR
      flightNumber: "AI 131 / AI 925 / AI 131",
      aircraft: "Boeing 787-8 / Airbus A320 / Boeing 777-200LR",
      bookingClass: "Economy",
      totalLayoverTime: "6h 35m",
      stopDetails: [
        {
          stopNumber: 1,
          airport: "Dubai International Airport (DXB)",
          city: "Dubai, UAE",
          arrivalTime: "11:15 am",
          departureTime: "02:30 pm",
          layoverDuration: "3h 15m",
          terminal: "Terminal 3",
        },
        {
          stopNumber: 2,
          airport: "Charles de Gaulle Airport (CDG)",
          city: "Paris, France",
          arrivalTime: "07:45 pm",
          departureTime: "09:05 pm",
          layoverDuration: "1h 20m",
          terminal: "Terminal 2E",
        },
      ],
      baggage: {
        checkedBaggage: "23kg",
        carryOn: "7kg",
      },
      amenities: {
        wifi: false,
        entertainment: true,
        meals: true,
        powerOutlets: false,
        streaming: false,
        snacks: true,
        blanket: true,
      },
      seatConfiguration: "3-3-3",
    },
    {
      id: 4,
      airline: "American Express",
      logo: AmericanExpressFullLogo,
      departure: "09:20 am",
      arrival: "02:55 pm",
      duration: "8h 45m",
      route: "DEL - LHR",
      from: "Indira Gandhi International Airport (DEL)",
      to: "London Heathrow Airport (LHR)",
      travelDate: new Date("2025-08-15"),
      stops: null, // Direct flight
      price: 89250.75, // INR
      dealType: "Cheapest",
      flightNumber: "BA 143",
      aircraft: "Boeing 787-9",
      bookingClass: "Premium Economy",
      baggage: {
        checkedBaggage: "23kg",
        carryOn: "8kg",
      },
      amenities: {
        wifi: true,
        entertainment: true,
        meals: true,
        powerOutlets: true,
        streaming: true,
        snacks: true,
        blanket: true,
        priorityBoarding: true,
      },
      seatConfiguration: "2-3-2",
    },
    {
      id: 5,
      airline: "Qatar Airways",
      logo: QatarAirwaysFullLogo,
      departure: "03:35 am",
      arrival: "08:15 am",
      duration: "9h 10m",
      route: "DEL - LHR",
      from: "Indira Gandhi International Airport (DEL)",
      to: "London Heathrow Airport (LHR)",
      travelDate: new Date("2025-08-15"),
      stops: 1,
      dealType: "Recommended",
      price: 71890.4, // INR
      flightNumber: "QR 570 / QR 001",
      aircraft: "Airbus A350-900 / Boeing 777-300ER",
      bookingClass: "Economy",
      layoverTime: "1h 35m",
      stopDetails: [
        {
          stopNumber: 1,
          airport: "Hamad International Airport (DOH)",
          city: "Doha, Qatar",
          arrivalTime: "05:50 am",
          departureTime: "07:25 am",
          layoverDuration: "1h 35m",
          terminal: "Terminal 1",
        },
      ],
      baggage: {
        checkedBaggage: "30kg",
        carryOn: "7kg",
      },
      amenities: {
        wifi: true,
        entertainment: true,
        meals: true,
        powerOutlets: true,
        streaming: true,
        snacks: true,
        blanket: true,
        amenityKit: true,
      },
      seatConfiguration: "3-3-3",
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {mockFlights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};
