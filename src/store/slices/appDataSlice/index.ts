import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import tabs from "../../../staticData/tabs";
import scrollingImages from "../../../staticData/scrollingImages";
import flightClassOptions from "../../../staticData/flightClassOptions";
import airlineOptions from "../../../staticData/airlineOptions";
import citizenshipOptions from "../../../staticData/citizenshipOptions";
import starRatingOptions from "../../../staticData/starRatingOptions";
import earlyCheckinoutTimeOptions from "../../../staticData/earlyCheckinoutTimeOptions";
import roomTypeOptions from "../../../staticData/roomTypeOptions";
import serviceFeatures from "../../../staticData/serviceFeatures";
import flightDeals from "../../../staticData/flightDeals";
import trendingCities from "../../../staticData/trendingCities";
import popularDestinations from "../../../staticData/popularDestinations";
import accountTravelFeatures from "../../../staticData/accountTravelFeatures";

export interface AppDataState {
  tabs: any[];
  scrollingImages: any[];
  flightClassOptions: any[];
  airlineOptions: any[];
  citizenshipOptions: any[];
  starRatingOptions: any[];
  earlyCheckinoutTimeOptions: any[];
  roomTypeOptions: any[];
  carOptions: any[];
  serviceFeatures: any[];
  flightDeals: any[];
  trendingCities: any[];
  popularDestinations: any[];
  accountTravelFeatures: any[];
}

const initialState: AppDataState = {
  tabs,
  scrollingImages,
  flightClassOptions,
  airlineOptions,
  citizenshipOptions,
  starRatingOptions,
  earlyCheckinoutTimeOptions,
  roomTypeOptions,
  carOptions: [],
  serviceFeatures,
  flightDeals,
  trendingCities,
  popularDestinations,
  accountTravelFeatures,
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    updateScrollingImages: (state, action: PayloadAction<any[]>) => {
      state.scrollingImages = action.payload;
    },
    updateFlightDeals: (state, action: PayloadAction<any[]>) => {
      state.flightDeals = action.payload;
    },
    updateTrendingCities: (state, action: PayloadAction<any[]>) => {
      state.trendingCities = action.payload;
    },
    updatePopularDestinations: (state, action: PayloadAction<any[]>) => {
      state.popularDestinations = action.payload;
    },
  },
});

export const {
  updateScrollingImages,
  updateFlightDeals,
  updateTrendingCities,
  updatePopularDestinations,
} = appDataSlice.actions;

export default appDataSlice.reducer;
