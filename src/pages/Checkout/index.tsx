import { FormProvider } from "react-hook-form";
import styles from "./Checkout.module.scss";
import { useCheckoutForm } from "@/hooks/useCheckoutForm";
import { useSearchParams } from "react-router-dom";
import FlightInfo from "./FlightInfo";
import PassengerCard from "./PassengerSection";
import ContactSection from "./ContactSection";
import Button from "@/components/common/Button";
import FlightBookingPanel from "./SummarySidebar";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const { form, onSubmit } = useCheckoutForm();

  console.log(searchParams);

  return (
    <div className={`${styles.container} min-h-screen`}>
      <header className="">
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
              <FlightInfo flightDetails={searchParams} />
              <PassengerCard form={form} />
              <ContactSection form={form} />
              <div className="flex items-center gap-3 mb-0">
                <input type="checkbox" {...form.register("acceptTerms")} />
                <p className="text-sm text-gray-600">
                  I agree to terms, fare conditions, and privacy policy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between ml-auto">
                  <Button type="submit">Confirm and pay</Button>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-20 h-fit">
              <div className="w-80">
                <FlightBookingPanel
                  destination={searchParams.get("to") || "Los Angeles, CA"}
                  passengers={2}
                  carryOnIncluded={true}
                  checkInBags={0}
                  services="No extra services selected"
                  regularPrice={145.94}
                  discount={4.49}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
