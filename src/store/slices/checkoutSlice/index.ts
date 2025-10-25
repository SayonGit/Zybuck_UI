import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Passenger = {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  dob: string;
};

type ContactInfo = {
  phone: string;
  email: string;
};

type CheckoutState = {
  step: number;
  passengers: Passenger[];
  contactInfo: ContactInfo;
  paymentInfo: { cardNumber: string; expiry: string; cvv: string }; // Expand as needed
};

const initialState: CheckoutState = {
  step: 1,
  passengers: [
    { firstName: "", middleName: "", lastName: "", gender: "", dob: "" },
    { firstName: "", middleName: "", lastName: "", gender: "", dob: "" },
  ],
  contactInfo: { phone: "", email: "" },
  paymentInfo: { cardNumber: "", expiry: "", cvv: "" },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setPassenger(
      state,
      action: PayloadAction<{ index: number; data: Passenger }>
    ) {
      state.passengers[action.payload.index] = action.payload.data;
    },
    setContactInfo(state, action: PayloadAction<ContactInfo>) {
      state.contactInfo = action.payload;
    },
    setPaymentInfo(
      state,
      action: PayloadAction<{ cardNumber: string; expiry: string; cvv: string }>
    ) {
      state.paymentInfo = action.payload;
    },
    resetCheckout(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setStep,
  setPassenger,
  setContactInfo,
  setPaymentInfo,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
