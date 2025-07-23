// src/store/slices/carSearchSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CarSearchData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  driverAge: string;
  carType: string;
  transmission: string;
}

interface CarSearchState {
  formData: CarSearchData;
  isLoading: boolean;
  searchResults: any[];
  isSameDropoffLocation: boolean; // For "Return to same location" checkbox
}

const initialState: CarSearchState = {
  formData: {
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "10:00",
    dropoffDate: "",
    dropoffTime: "10:00",
    driverAge: "25-65",
    carType: "any",
    transmission: "any",
  },
  isLoading: false,
  searchResults: [],
  isSameDropoffLocation: true, // Default to same location
};

const carSearchSlice = createSlice({
  name: "carSearch",
  initialState,
  reducers: {
    updateCarFormData: (
      state,
      action: PayloadAction<Partial<CarSearchData>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCarLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCarSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    toggleSameDropoffLocation: (state) => {
      state.isSameDropoffLocation = !state.isSameDropoffLocation;
      if (state.isSameDropoffLocation) {
        // When checked, set dropoff same as pickup
        state.formData.dropoffLocation = state.formData.pickupLocation;
      } else {
        // When unchecked, clear dropoff location
        state.formData.dropoffLocation = "";
      }
    },
    setSameDropoffLocation: (state, action: PayloadAction<boolean>) => {
      state.isSameDropoffLocation = action.payload;
      if (action.payload) {
        state.formData.dropoffLocation = state.formData.pickupLocation;
      }
    },
    syncDropoffLocation: (state) => {
      // Sync dropoff with pickup when same location is enabled
      if (state.isSameDropoffLocation) {
        state.formData.dropoffLocation = state.formData.pickupLocation;
      }
    },
    resetCarForm: (state) => {
      state.formData = initialState.formData;
      state.isSameDropoffLocation = true;
    },
  },
});

export const {
  updateCarFormData,
  setCarLoading,
  setCarSearchResults,
  toggleSameDropoffLocation,
  setSameDropoffLocation,
  syncDropoffLocation,
  resetCarForm,
} = carSearchSlice.actions;

export default carSearchSlice.reducer;
