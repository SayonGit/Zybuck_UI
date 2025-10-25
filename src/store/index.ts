import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./slices/flightSearchSlice";
import hotelSearchReducer from "./slices/hoteStaySlice";
import carSearchReducer from "./slices/carSearchSlice";
import appDataReducer from "./slices/appDataSlice";
import checkoutReducer from "./slices/checkoutSlice";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    hotelSearch: hotelSearchReducer,
    carSearch: carSearchReducer,
    appData: appDataReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
