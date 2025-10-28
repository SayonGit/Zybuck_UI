import { z } from "zod";

export const passengerSchema = z.object({
  title: z.enum(["Mr", "Ms", "Mrs"]),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  dob: z.object({
    day: z.string().min(1, "Required"),
    month: z.string().min(1, "Required"),
    year: z.string().min(1, "Required"),
  }),
  nationality: z.string().min(1, "Required"),
  docType: z.enum(["Passport", "ID Card"]),
  docNumber: z.string().min(3, "Invalid"),
  docExpiry: z.object({
    month: z.string().min(1, "Required"),
    year: z.string().min(1, "Required"),
  }),
});

export const contactSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    emailConfirm: z.string().email("Invalid email address"),
    phoneCode: z.string().min(1, "Country code is required"),
    phone: z.string().min(1, "Phone number is required"),
    billingAddress: z.string().min(1, "Billing address is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: "Emails don't match",
    path: ["emailConfirm"],
  });

export const extrasSchema = z.object({
  baggage: z.enum(["None", "15kg", "23kg"]).default("None"),
  seat: z.string().optional(),
  insurance: z.boolean().default(false),
  prime: z.boolean().default(false),
});

export const paymentSchema = z.object({
  cardName: z.string().min(1, "Required"),
  cardNumber: z.string().regex(/^\d{12,19}$/, "Invalid card number"),
  expiryMonth: z.string().min(1, "Required"),
  expiryYear: z.string().min(1, "Required"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
  billingAddress: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  zip: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
});

export const checkoutSchema = z.object({
  passenger: passengerSchema.array(),
  contact: contactSchema,
  extras: extrasSchema,
  payment: paymentSchema,
  acceptTerms: z.boolean().refine((v) => v, { message: "Required" }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
