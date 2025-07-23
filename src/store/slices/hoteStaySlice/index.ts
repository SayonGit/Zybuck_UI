// src/store/slices/hotelSearchSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HotelSearchData {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  earlyCheckInDate: string;
  earlyCheckOutDate: string;
  rooms: number;
  adults: number;
  children: number;
  guestsCitizenship: string;
  starRating: string;
  roomType: string;
  freeCancellation: boolean;
}

interface HotelSearchState {
  formData: HotelSearchData;
  isLoading: boolean;
  searchResults: any[];
}

const initialState: HotelSearchState = {
  formData: {
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    earlyCheckInDate: "",
    earlyCheckOutDate: "",
    rooms: 1,
    adults: 2,
    children: 0,
    guestsCitizenship: "",
    starRating: "any",
    roomType: "",
    freeCancellation: false,
  },
  isLoading: false,
  searchResults: [],
};

const hotelSearchSlice = createSlice({
  name: "hotelSearch",
  initialState,
  reducers: {
    updateHotelFormData: (
      state,
      action: PayloadAction<Partial<HotelSearchData>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateHotelPassengerCount: (
      state,
      action: PayloadAction<{
        type: "rooms" | "adults" | "children";
        increment: boolean;
      }>
    ) => {
      const { type, increment } = action.payload;
      state.formData[type] = Math.max(
        0,
        state.formData[type] + (increment ? 1 : -1)
      );
    },
    setHotelLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHotelSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    resetHotelForm: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const {
  updateHotelFormData,
  updateHotelPassengerCount,
  setHotelLoading,
  setHotelSearchResults,
  resetHotelForm,
} = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
