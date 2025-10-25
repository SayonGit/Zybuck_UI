import React from "react";

interface FlightBookingPanelProps {
  destination?: string;
  passengers?: number;
  carryOnIncluded?: boolean;
  checkInBags?: number;
  services?: string;
  regularPrice?: number;
  discount?: number;
}

const FlightBookingPanel: React.FC<FlightBookingPanelProps> = ({
  destination = "Los Angeles, CA",
  passengers = 2,
  carryOnIncluded = true,
  checkInBags = 0,
  services = "No extra services selected",
  regularPrice = 145.94,
  discount = 4.49,
}) => {
  const totalPrice = regularPrice - discount;
  const pricePerPassenger = totalPrice / passengers;

  return (
    <div>
      <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with destination image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
          <div className="absolute inset-0 bg-opacity-20">
            <img
              src="https://wallpaperbat.com/img/364620-la-wallpaper-top-free-la-background.jpg"
              alt=""
            />
          </div>
          <div className="absolute top-4 left-4 text-white">
            <p className="text-sm opacity-90">Your trip to</p>
            <h3 className="text-xl font-semibold">{destination}</h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Passengers */}
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Passengers</h4>
            <p className="text-gray-600">{passengers} adults</p>
          </div>

          {/* Carry-on bag */}
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Carry-on bag</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Departure</span>
              <span className="text-gray-700">
                {carryOnIncluded ? "Personal item included" : "Not included"}
              </span>
            </div>
          </div>

          {/* Check-in baggage */}
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Check-in baggage</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Departure</span>
              <span className="text-gray-700">
                {checkInBags === 0
                  ? "No bags"
                  : `${checkInBags} bag${checkInBags > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Services</h4>
            <p className="text-gray-500 text-sm">{services}</p>
          </div>

          <hr className="border-gray-200" />

          {/* Pricing breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Regular price</span>
              <span className="text-gray-900">${regularPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount applied</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Total pricing */}
        </div>
        <div className="bg-blue-50 space-y-1 p-5">
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-gray-900">Total price</span>
            <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per passenger</span>
            <span className="text-gray-700">
              ${pricePerPassenger.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Taxes and service charges included
          </p>
        </div>

        {/* AirFare promotion section */}
      </div>
      <div className="mt-5 p-5 border-t border-gray-100 bg-white rounded-xl shadow-lg overflow-hidden">
        <h4 className="font-medium text-blue-900 mb-3">
          Why book with AirFare?
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No one else offers more flight combinations
          </li>
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Free date change available for many flights
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FlightBookingPanel;
