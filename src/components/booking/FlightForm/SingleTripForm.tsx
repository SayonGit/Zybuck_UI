import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateFormData,
  TripOption,
} from "../../../store/slices/flightSearchSlice";
import UseFlightForm from "../../../hooks/useFlightForm";
import InputField from "../../common/InputField";
import { InputDividerIcon } from "../../../assets";
// import styles from "./FlightFormStyle.module.scss";
import { useAirportSearch } from "./useAirportSearch";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SingleTripFormProps {
  selectedTrip: string;
}

const SingleTripForm: React.FC<SingleTripFormProps> = ({ selectedTrip }) => {
  const dispatch = useAppDispatch();
  const { formData } = UseFlightForm();

  const fromSearch = useAirportSearch(formData.to);
  const toSearch = useAirportSearch(formData.from);

  // open state for suggestion dropdowns
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  // collect wrapper nodes (desktop + mobile wrappers) into an array
  const wrapperNodes = useRef<HTMLDivElement[]>([]);
  const setWrapperRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (!wrapperNodes.current.includes(el)) wrapperNodes.current.push(el);
  };

  const handleSelect = useCallback(
    (type: "from" | "to", value: string) => {
      dispatch(updateFormData({ [type]: value }));
      // clear queries in the search hook as you had before
      if (type === "from") {
        fromSearch.setQuery("");
        setFromOpen(false);
      }
      if (type === "to") {
        toSearch.setQuery("");
        setToOpen(false);
      }
    },
    [dispatch, fromSearch, toSearch]
  );

  // close dropdowns when clicking outside any wrapper
  useEffect(() => {
    const onDocumentMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const clickedInsideAny = wrapperNodes.current.some((node) =>
        node.contains(target)
      );

      if (!clickedInsideAny) {
        setFromOpen(false);
        setToOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, []);

  const renderSuggestions = (
    suggestions: ReturnType<typeof useAirportSearch>["suggestions"],
    type: "from" | "to",
    loading: boolean,
    error?: string
  ) => {
    return (
      <div className="absolute z-50 bg-white rounded-lg mt-1 w-full shadow-lg max-h-56 overflow-y-auto">
        {loading && (
          <div className="flex justify-center items-center py-4 text-gray-500">
            <Icon
              icon="eos-icons:loading"
              className="w-5 h-5 animate-spin mr-2"
            />
            <span className="text-sm">Loading...</span>
          </div>
        )}

        {!loading && error && (
          <div className="text-red-500 text-sm p-3 text-center border-t">
            {error}
          </div>
        )}

        {!loading && !error && suggestions.length > 0 && (
          <ul className="border rounded-lg ">
            {suggestions.map((item, i) => (
              <li
                key={`${item.airportCode}-${i}`}
                tabIndex={0}
                className="p-2 hover:bg-gray-100 cursor-pointer transition-all duration-150"
                onClick={() =>
                  handleSelect(type, `${item.city} (${item.airportCode})`)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleSelect(type, `${item.city} (${item.airportCode})`)
                }
              >
                <div className="text-sm font-medium text-gray-800">
                  {item.city} ({item.airportCode})
                </div>
                <div className="text-xs text-gray-500">
                  {item.airportName}, {item.country}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const swapLocations = () => {
    const currentFrom = formData.from;
    const currentTo = formData.to;
    dispatch(updateFormData({ from: currentTo, to: currentFrom }));
  };

  return (
    <>
      {/* From/To Section - Desktop Version */}
      <div className="w-full md:max-w-[55%] md:block hidden">
        <div className="flex gap-2 border b-clr rounded-lg h-input">
          <div
            className="relative flex-1"
            // attach wrapper ref for outside-click detection
            ref={setWrapperRef}
          >
            <InputField
              label="From"
              value={formData.from}
              isDouble={true}
              placeholder="Enter city or airport"
              {...({ onFocus: () => setFromOpen(true) } as any)}
              onChange={(val) => {
                fromSearch.setQuery(val);
                dispatch(updateFormData({ from: val }));
                setFromOpen(true);
              }}
            />
            {formData.from && (
              <Icon
                icon="mdi:close"
                className="absolute right-2 bottom-2 cursor-pointer w-4 h-4 text-gray-400"
                onClick={() => {
                  dispatch(updateFormData({ from: "" }));
                  handleSelect("from", "");
                }}
              />
            )}
            {fromOpen &&
              renderSuggestions(
                fromSearch.suggestions,
                "from",
                fromSearch.loading,
                fromSearch.error
              )}
          </div>

          <div className="flex items-center px-2">
            <img
              src={InputDividerIcon}
              className="w-4 h-8 cursor-pointer"
              onClick={swapLocations}
            />
          </div>
          <div className="relative flex-1" ref={setWrapperRef}>
            <InputField
              label="To"
              value={formData.to}
              placeholder="Enter city or airport"
              isDouble={true}
              {...({ onFocus: () => setToOpen(true) } as any)}
              onChange={(val) => {
                toSearch.setQuery(val);
                dispatch(updateFormData({ to: val }));
                setToOpen(true);
              }}
            />
            {formData.to && (
              <Icon
                icon="mdi:close"
                className="absolute right-2 bottom-2 cursor-pointer w-4 h-4 text-gray-400"
                onClick={() => {
                  dispatch(updateFormData({ to: "" }));
                  handleSelect("to", "");
                }}
              />
            )}
            {toOpen &&
              renderSuggestions(
                toSearch.suggestions,
                "to",
                toSearch.loading,
                toSearch.error
              )}
          </div>
        </div>
      </div>

      {/* From/To Section - Mobile Version */}
      <div className="w-full md:max-w-[55%] md:hidden block">
        <div className="flex flex-col gap-2">
          <div className="relative flex-1" ref={setWrapperRef}>
            <InputField
              label="From"
              value={formData.from}
              placeholder="Enter city or airport"
              {...({ onFocus: () => setFromOpen(true) } as any)}
              onChange={(val) => {
                fromSearch.setQuery(val);
                dispatch(updateFormData({ from: val }));
                setFromOpen(true);
              }}
            />
            {formData.from && (
              <Icon
                icon="mdi:close"
                className="absolute right-2 bottom-2 cursor-pointer w-4 h-4 text-gray-400"
                onClick={() => {
                  dispatch(updateFormData({ from: "" }));
                  handleSelect("from", "");
                }}
              />
            )}
            {fromOpen &&
              renderSuggestions(
                fromSearch.suggestions,
                "from",
                fromSearch.loading,
                fromSearch.error
              )}
          </div>
          <div className="flex items-center mx-auto px-2">
            <img src={InputDividerIcon} className="w-4 h-4" />
          </div>
          <div className="relative flex-1" ref={setWrapperRef}>
            <InputField
              label="To"
              placeholder="Enter city or airport"
              value={formData.to}
              {...({ onFocus: () => setToOpen(true) } as any)}
              onChange={(value) => {
                toSearch.setQuery(value);
                dispatch(updateFormData({ to: value }));
                setToOpen(true);
              }}
            />
            {formData.to && (
              <Icon
                icon="mdi:close"
                className="absolute right-2 bottom-2 cursor-pointer w-4 h-4 text-gray-400"
                onClick={() => {
                  dispatch(updateFormData({ to: "" }));
                  handleSelect("to", "");
                }}
              />
            )}
            {toOpen &&
              renderSuggestions(
                toSearch.suggestions,
                "to",
                toSearch.loading,
                toSearch.error
              )}
          </div>
        </div>
      </div>

      {/* Date Section - Responsive for One Way vs Round Trip */}
      <div
        className={`w-full ${
          selectedTrip === TripOption.roundTrip
            ? "md:max-w-[25%]"
            : "md:max-w-[15%]"
        }`}
      >
        {/* Desktop Layout - Dates side by side for round trip */}
        <div className="hidden md:block">
          {selectedTrip === TripOption.roundTrip ? (
            <div className="flex gap-0 h-input border b-clr rounded-lg overflow-hidden">
              <div className="flex-1 relative border-r b-clr w-1/2">
                <InputField
                  className={`flex-1 h-input`}
                  label="Depart"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.departDate}
                  isDouble={true}
                  onChange={(value) =>
                    dispatch(updateFormData({ departDate: value }))
                  }
                />
              </div>
              <div className="flex-1 relative w-1/2">
                <InputField
                  className={`flex-1 h-input`}
                  label="Return"
                  type="date"
                  min={
                    new Date(formData.departDate).toISOString().split("T")[0]
                  }
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
              min={new Date().toISOString().split("T")[0]}
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
              min={new Date().toISOString().split("T")[0]}
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
                min={new Date(formData.departDate).toISOString().split("T")[0]}
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
