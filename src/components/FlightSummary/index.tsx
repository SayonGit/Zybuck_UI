// components/FlightSummary.tsx
import { useState } from "react";
import { Icon } from "@iconify/react";

interface FlightSummaryProps {
  searchParams: URLSearchParams;
}

export const FlightSummary = ({ searchParams }: FlightSummaryProps) => {
  const [tripType, setTripType] = useState("one-way");

  const from = searchParams.get("from") || "Indira Gandhi - New Delhi";
  const to = searchParams.get("to") || "London City Airport, UK";
  const departDate = searchParams.get("departDate") || "24 Jun, Tu";
  const returnDate = searchParams.get("returnDate") || "";
  const adults = searchParams.get("adults") || "1";
  const children = searchParams.get("children") || "1";
  const infants = searchParams.get("infants") || "1";
  const classType = searchParams.get("class") || "Economy";
  const airline = searchParams.get("airline") || "All airlines";

  return (
    <div className="p-6">
      {/* Trip Type Selector */}
      <div className="flex space-x-8 mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === "one-way"}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-blue-600">
            One way
          </span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === "round-trip"}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-600">
            Round Trip
          </span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="multiple"
            checked={tripType === "multiple"}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-600">
            Multiple Destination
          </span>
        </label>
      </div>

      {/* Search Form */}
      <div className="grid grid-cols-12 gap-4 items-end">
        {/* From/To Section */}
        <div className="col-span-5 relative">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <div className="relative">
                <input
                  type="text"
                  value={from}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <div className="relative">
                <input
                  type="text"
                  value={to}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* Swap Button */}
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-50">
            <Icon
              icon="heroicons:arrow-right"
              className="w-4 h-4 text-gray-600"
            />
          </button>
        </div>

        {/* Date */}
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Depart</label>
          <div className="relative">
            <input
              type="text"
              value={departDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
            <Icon
              icon="heroicons:calendar-days"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Passengers</label>
          <div className="grid grid-cols-3 gap-1">
            <div className="text-center">
              <div className="text-xs text-gray-500">Adults</div>
              <div className="flex items-center justify-center">
                <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">
                  −
                </button>
                <span className="mx-2 text-sm font-medium">{adults}</span>
                <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">
                  +
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Children</div>
              <div className="flex items-center justify-center">
                <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">
                  −
                </button>
                <span className="mx-2 text-sm font-medium">{children}</span>
                <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">
                  +
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Infants</div>
              <div className="flex items-center justify-center">
                <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">
                  −
                </button>
                <span className="mx-2 text-sm font-medium">{infants}</span>
                <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Airline */}
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Airline</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All airlines</option>
            <option value="american">American Airlines</option>
            <option value="delta">Delta Airlines</option>
            <option value="united">United Airlines</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-span-1">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
            <span className="text-sm">Show Flights</span>
          </button>
        </div>
      </div>

      {/* Class Selection */}
      <div className="flex space-x-4 mt-6">
        {["Economy", "Premium Economy", "Business", "First Class"].map(
          (cls) => (
            <button
              key={cls}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                classType === cls
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {cls}
            </button>
          )
        )}
      </div>
    </div>
  );
};
