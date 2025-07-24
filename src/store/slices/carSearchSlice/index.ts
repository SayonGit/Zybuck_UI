import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CarSearchData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  driversAge: boolean; // Changed to boolean for checkbox
}

interface CarSearchState {
  formData: CarSearchData;
  isLoading: boolean;
  searchResults: any[];
  isSameDropoffLocation: boolean;
}

const initialState: CarSearchState = {
  formData: {
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "10:00",
    dropoffDate: "",
    dropoffTime: "10:00",
    driversAge: true, // Default to true (26-69 years)
  },
  isLoading: false,
  searchResults: [],
  isSameDropoffLocation: true,
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
        state.formData.dropoffLocation = state.formData.pickupLocation;
      } else {
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
