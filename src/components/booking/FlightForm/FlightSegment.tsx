import React from "react";
import InputField from "../../common/InputField";
import { InputDividerIcon } from "../../../assets";
import { Icon } from "@iconify/react";

interface FlightSegmentData {
  id: string;
  from: string;
  to: string;
  departDate: string;
}

interface FlightSegmentProps {
  segment: FlightSegmentData;
  index: number;
  onUpdate: (id: string, field: keyof FlightSegmentData, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  isLast: boolean;
}

const FlightSegment: React.FC<FlightSegmentProps> = ({
  segment,
  index,
  onUpdate,
  onRemove,
  canRemove,
  isLast,
}) => {
  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-2 items-center">
        {/* From/To Section */}
        <div className="flex-1">
          <div className="flex gap-2 border border-[#D2D2D2] rounded-lg h-input">
            <InputField
              className="flex-1"
              label="From"
              value={segment.from}
              isDouble={true}
              onChange={(value) => onUpdate(segment.id, "from", value)}
            />
            <div className="flex items-center px-2">
              <img src={InputDividerIcon} className="w-4 h-12" />
            </div>
            <InputField
              className="flex-1"
              label="To"
              value={segment.to}
              isDouble={true}
              onChange={(value) => onUpdate(segment.id, "to", value)}
            />
          </div>
        </div>

        {/* Date */}
        <div className="w-40">
          <InputField
            className="w-full h-input date-input-no-icon"
            label="Depart"
            type="date"
            value={segment.departDate}
            onChange={(value) => onUpdate(segment.id, "departDate", value)}
          />
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(segment.id)}
            className="ml-auto p-1 text-black hover:bg-red-50 rounded transition-colors"
          >
            <Icon icon="heroicons:x-mark" className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-2">
        <div className="flex flex-col gap-2">
          <InputField
            className="w-full"
            label="From"
            value={segment.from}
            onChange={(value) => onUpdate(segment.id, "from", value)}
          />
          <div className="flex items-center ">
            <img src={InputDividerIcon} className="w-4 h-10" />
          </div>
          <InputField
            className="w-full"
            label="To"
            value={segment.to}
            onChange={(value) => onUpdate(segment.id, "to", value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <InputField
            className="w-full h-input date-input-no-icon"
            label="Depart"
            type="date"
            value={segment.departDate}
            onChange={(value) => onUpdate(segment.id, "departDate", value)}
          />
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(segment.id)}
              className="ml-auto p-1 text-black hover:bg-red-50 rounded transition-colors"
            >
              <Icon icon="heroicons:x-mark" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Connection Line for Desktop */}
      {/* {!isLast && (
        <div className="hidden md:block absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-4 bg-gray-300"></div>
        </div>
      )} */}
    </div>
  );
};

export default FlightSegment;
