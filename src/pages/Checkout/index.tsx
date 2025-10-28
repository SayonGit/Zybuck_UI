import { FormProvider } from "react-hook-form";
import styles from "./Checkout.module.scss";
import { useCheckoutForm } from "@/hooks/useCheckoutForm";
import { useLocation, useSearchParams } from "react-router-dom";
import FlightInfo from "./FlightInfo";
import PassengerCard from "./PassengerSection";
import ContactSection from "./ContactSection";
import Button from "@/components/common/Button";
import FlightBookingPanel from "./SummarySidebar";
import type { Flight } from "@/types";
import { useEffect } from "react";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const flightData: Flight = location.state;
  const { form, onSubmit } = useCheckoutForm();

  const adults = +searchParams.get("adults")! || 1;
  const children = +searchParams.get("children")! || 0;
  const infants = +searchParams.get("infants")! || 0;
  const totalPassengers = adults + children + infants;

  useEffect(() => {
    const currentPassengers = form.getValues("passenger") || [];
    if (currentPassengers.length !== totalPassengers) {
      const newPassengers = Array.from({ length: totalPassengers }, () => ({
        title: "Mr" as const,
        firstName: "",
        lastName: "",
        dob: { day: "", month: "", year: "" },
        nationality: "",
        docType: "Passport" as const,
        docNumber: "",
        docExpiry: { month: "", year: "" },
      }));
      form.setValue("passenger", newPassengers);
    }
  }, [adults, children, infants, totalPassengers, form]);

  const passengers = form.watch("passenger");

  const getPassengerLabel = (index: number) => {
    if (index < adults) return `Adult ${index + 1}`;
    if (index < adults + children) return `Child ${index - adults + 1}`;
    return `Infant ${index - adults - children + 1}`;
  };

  return (
    <div className={`${styles.container} min-h-screen`}>
      <header>
        <div className="mx-auto py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-gray-900 font-semibold leading-tight">
              Your trip to {searchParams.get("to")}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 py-6">
        <FormProvider {...form}>
          <form
            onSubmit={onSubmit}
            className="grid gap-6 lg:grid-cols-[1fr_380px]"
          >
            <div className="space-y-6">
              {/* ✈️ Flight Summary */}
              <FlightInfo flightDetails={flightData} />

              {/* 🧍 Passenger Cards */}
              {passengers.map((_, index) => (
                <PassengerCard
                  key={index}
                  form={form}
                  index={index}
                  typeLabel={getPassengerLabel(index)}
                />
              ))}

              {/* 📞 Contact Information */}
              <ContactSection form={form} />

              {/* ✅ Terms + Submit */}
              <div className="flex items-center gap-3 mb-0">
                <input type="checkbox" {...form.register("acceptTerms")} />
                <p className="text-sm text-gray-600">
                  I agree to terms, fare conditions, and privacy policy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between ml-auto">
                  <Button type="submit">Confirm and Pay</Button>
                </div>
              </div>
            </div>

            {/* 🧾 Booking Summary Sidebar */}
            <div className="lg:sticky lg:top-20 h-fit">
              <div className="w-80">
                <FlightBookingPanel
                  destination={searchParams.get("to") || "Los Angeles, CA"}
                  adults={adults}
                  children={children}
                  infants={infants}
                  carryOnIncluded
                  checkInBags={0}
                  services="No extra services selected"
                  priceDetails={flightData.priceDetails}
                  discount={0}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
