import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./slices/flightSearchSlice";
import hotelSearchReducer from "./slices/hoteStaySlice";
import carSearchReducer from "./slices/carSearchSlice";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    hotelSearch: hotelSearchReducer,
    carSearch: carSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
