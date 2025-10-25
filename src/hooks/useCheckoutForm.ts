import { useForm } from "react-hook-form";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "../validations/CheckoutSchema";
import { customZodResolver } from "./customZodResolver";

export function useCheckoutForm(initial?: Partial<CheckoutFormValues>) {
  const form = useForm<CheckoutFormValues>({
    resolver: customZodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      passenger: {
        title: "Mr",
        firstName: "",
        lastName: "",
        dob: { day: "", month: "", year: "" },
        nationality: "",
        docType: "Passport",
        docNumber: "",
        docExpiry: { month: "", year: "" },
      },
      contact: {
        email: "",
        emailConfirm: "",
        phoneCode: "+1",
        phone: "",
        billingAddress: "",
        zipCode: "",
        city: "",
        state: "",
        country: "US",
      },
      extras: {
        baggage: "None" as const,
        seat: "",
        insurance: false,
        prime: false,
      },
      payment: {
        cardName: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
        billingAddress: "",
        city: "",
        zip: "",
        country: "",
      },
      acceptTerms: false,
      ...initial,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("checkout submit", values);
  });

  return { form, onSubmit };
}
