import { z } from "zod";

export const flightSearchSchema = z.object({
  //   from: z.string().min(1, "Please select departure city"),
  //   to: z.string().min(1, "Please select destination city"),
  departDate: z.string().min(1, "Please choose a departure date"),
  returnDate: z.string().optional(),
  adults: z.number().min(1, "At least one adult is required"),
  children: z.number().min(0),
  infants: z.number().min(0),
  tripType: z.string().min(1, "Trip type is required"),
  class: z.string().min(1, "Please select travel class"),
  airline: z.string().optional(),
});
