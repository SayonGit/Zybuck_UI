import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FlightSearchData } from "../../../types";

export const TripOption = {
  oneWay: "oneWay",
  roundTrip: "roundTrip",
  multipleDestination: "multipleDestination",
} as const;

interface FlightSegment {
  id: string;
  from: string;
  to: string;
  departDate: string;
}

export type TripOption = (typeof TripOption)[keyof typeof TripOption];

interface FlightSearchState {
  formData: FlightSearchData;
  selectedTrip: TripOption;
  selectedAirline: string;
  isLoading: boolean;
  searchResults: any[];
  multipleDestinations: FlightSegment[];
}

const initialState: FlightSearchState = {
  formData: {
    from: "",
    to: "",
    departDate: new Date().toISOString().split("T")[0],
    adults: 1,
    children: 0,
    infants: 0,
    tripType: "oneWay",
    class: "economy",
    airline: "all",
  },
  selectedTrip: "oneWay",
  selectedAirline: "all",
  isLoading: false,
  searchResults: [],
  multipleDestinations: [
    { id: "1", from: "New Delhi", to: "Mumbai", departDate: "" },
    { id: "2", from: "Mumbai", to: "Dubai", departDate: "" },
  ],
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action: PayloadAction<Partial<FlightSearchData>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateSelectedTrip: (state, action: PayloadAction<TripOption>) => {
      state.selectedTrip = action.payload;
      state.formData.tripType = action.payload as any;
    },
    updateSelectedAirline: (state, action: PayloadAction<string>) => {
      state.selectedAirline = action.payload;
      state.formData.airline = action.payload;
    },
    updatePassengerCount: (
      state,
      action: PayloadAction<{
        type: "adults" | "children" | "infants";
        increment: boolean;
      }>
    ) => {
      const { type, increment } = action.payload;
      state.formData[type] = Math.max(
        0,
        state.formData[type] + (increment ? 1 : -1)
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.selectedTrip = initialState.selectedTrip;
      state.selectedAirline = initialState.selectedAirline;
    },
    updateMultipleDestinations: (
      state,
      action: PayloadAction<FlightSegment[]>
    ) => {
      state.multipleDestinations = action.payload;
    },
    addDestination: (state, action: PayloadAction<FlightSegment>) => {
      state.multipleDestinations.push(action.payload);
    },
    removeDestination: (state, action: PayloadAction<string>) => {
      state.multipleDestinations = state.multipleDestinations.filter(
        (segment) => segment.id !== action.payload
      );
    },
  },
});

export const {
  updateFormData,
  updateSelectedTrip,
  updateSelectedAirline,
  updatePassengerCount,
  setLoading,
  setSearchResults,
  resetForm,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
