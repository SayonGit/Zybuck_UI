import React, { useState } from "react";
import { Icon } from "@iconify/react";
import FlightSegment from "./FlightSegment";
import PassengerCounters from "./PassengerCounters";

interface FlightSegmentData {
  id: string;
  from: string;
  to: string;
  departDate: string;
}

const MultipleDestinationForm: React.FC = () => {
  const [segments, setSegments] = useState<FlightSegmentData[]>([
    { id: "1", from: "New Delhi", to: "Mumbai", departDate: "" },
    { id: "2", from: "Mumbai", to: "Dubai", departDate: "" },
  ]);

  const addSegment = () => {
    const lastSegment = segments[segments.length - 1];
    const newSegment: FlightSegmentData = {
      id: Date.now().toString(),
      from: lastSegment.to,
      to: "",
      departDate: "",
    };
    setSegments([...segments, newSegment]);
  };

  const removeSegment = (id: string) => {
    if (segments.length > 2) {
      setSegments(segments.filter((segment) => segment.id !== id));
    }
  };

  const updateSegment = (
    id: string,
    field: keyof FlightSegmentData,
    value: string
  ) => {
    const updatedSegments = segments.map((segment) =>
      segment.id === id ? { ...segment, [field]: value } : segment
    );
    setSegments(updatedSegments);

    // Update the next segment's "from" field when current "to" changes
    if (field === "to") {
      const currentIndex = updatedSegments.findIndex((s) => s.id === id);
      if (currentIndex < updatedSegments.length - 1) {
        updatedSegments[currentIndex + 1].from = value;
      }
    }

    setSegments(updatedSegments);
  };

  return (
    <div className="mb-6">
      {/* Flight Segments */}
      <div className="space-y-4 mb-4">
        {segments.map((segment, index) => (
          <FlightSegment
            key={segment.id}
            segment={segment}
            index={index}
            onUpdate={updateSegment}
            onRemove={removeSegment}
            canRemove={segments.length > 2}
            isLast={index === segments.length - 1}
          />
        ))}
      </div>

      {/* Add Flight Button */}
      <div className="flex flex-col sm:flex-row gap-2 items-start">
        <button
          type="button"
          onClick={addSegment}
          className="flex h-input justify-center w-full items-center gap-2 px-4 py-2 text-sm text-black rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <Icon icon="heroicons:plus" className="w-4 h-4" />
          Add another flight
        </button>

        {/* Passenger Counters for Mobile */}
        <div className="w-full md:w-fit">
          <PassengerCounters selectedTrip="multipleDestination" />
        </div>
      </div>

      {/* Passenger Counters for Desktop - Right aligned */}
      {/* <div className="hidden sm:block sm:absolute sm:top-0 sm:right-0 sm:w-[30%]">
        <PassengerCounters selectedTrip="multipleDestination" />
      </div> */}
    </div>
  );
};

export default MultipleDestinationForm;
