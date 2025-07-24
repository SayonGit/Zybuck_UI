import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateFormData,
  TripOption,
} from "../../../store/slices/flightSearchSlice";
import UseFlightForm from "../../../hooks/useFlightForm";
import InputField from "../../common/InputField";
import { InputDividerIcon } from "../../../assets";
import styles from "./FlightFormStyle.module.scss";

interface SingleTripFormProps {
  selectedTrip: string;
}

const SingleTripForm: React.FC<SingleTripFormProps> = ({ selectedTrip }) => {
  const dispatch = useAppDispatch();
  const { formData } = UseFlightForm();

  return (
    <>
      {/* From/To Section - Desktop Version */}
      <div className="w-full md:w-[55%] md:block hidden">
        <div className="flex gap-2 border b-clr rounded-lg h-input">
          <InputField
            className="flex-1"
            label="From"
            value={formData.from}
            isDouble={true}
            onChange={(value) => dispatch(updateFormData({ from: value }))}
          />
          <div className="flex items-center px-2">
            <img src={InputDividerIcon} className="w-4 h-4" />
          </div>
          <InputField
            className="flex-1"
            label="To"
            value={formData.to}
            isDouble={true}
            onChange={(value) => dispatch(updateFormData({ to: value }))}
          />
        </div>
      </div>

      {/* From/To Section - Mobile Version */}
      <div className="w-full md:w-[55%] md:hidden block">
        <div className="flex flex-col gap-2">
          <InputField
            className="flex-1"
            label="From"
            value={formData.from}
            onChange={(value) => dispatch(updateFormData({ from: value }))}
          />
          <div className="flex items-center mx-auto px-2">
            <img src={InputDividerIcon} className="w-4 h-4" />
          </div>
          <InputField
            className="flex-1"
            label="To"
            value={formData.to}
            onChange={(value) => dispatch(updateFormData({ to: value }))}
          />
        </div>
      </div>

      {/* Date Section - Responsive for One Way vs Round Trip */}
      <div
        className={`w-full ${
          selectedTrip === TripOption.roundTrip ? "md:w-[25%]" : "md:w-[15%]"
        }`}
      >
        {/* Desktop Layout - Dates side by side for round trip */}
        <div className="hidden md:block">
          {selectedTrip === TripOption.roundTrip ? (
            <div className="flex gap-0 h-input border b-clr rounded-lg overflow-hidden">
              <div className="flex-1 relative border-r b-clr w-1/2">
                <InputField
                  className={`flex-1 h-input ${styles["date-input-no-icon"]}`}
                  label="Depart"
                  type="date"
                  value={formData.departDate}
                  isDouble={true}
                  onChange={(value) =>
                    dispatch(updateFormData({ departDate: value }))
                  }
                />
              </div>
              <div className="flex-1 relative w-1/2">
                <InputField
                  className={`flex-1 h-input ${styles["date-input-no-icon"]}`}
                  label="Return"
                  type="date"
                  isDouble={true}
                  value={formData.returnDate || ""}
                  onChange={(value) =>
                    dispatch(updateFormData({ returnDate: value }))
                  }
                />
              </div>
            </div>
          ) : (
            <InputField
              className="w-full h-input date-input-no-icon"
              label="Depart"
              type="date"
              value={formData.departDate}
              onChange={(value) =>
                dispatch(updateFormData({ departDate: value }))
              }
            />
          )}
        </div>

        {/* Mobile Layout - Dates stacked for round trip */}
        <div className="md:hidden block">
          <div className="flex flex-col gap-2">
            <InputField
              className="w-full h-input date-input-no-icon"
              label="Depart"
              type="date"
              value={formData.departDate}
              onChange={(value) =>
                dispatch(updateFormData({ departDate: value }))
              }
            />
            {selectedTrip === "roundTrip" && (
              <InputField
                className="w-full h-input date-input-no-icon"
                label="Return"
                type="date"
                value={formData.returnDate || ""}
                onChange={(value) =>
                  dispatch(updateFormData({ returnDate: value }))
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTripForm;
