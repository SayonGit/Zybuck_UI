import { type UseFormReturn } from "react-hook-form";
import styles from "./Checkout.module.scss";
import type { CheckoutFormValues } from "@/validations/CheckoutSchema";

type Props = { form: UseFormReturn<CheckoutFormValues> };

export default function PaymentSection({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className={`${styles.card} overflow-hidden`}>
      <header className={styles.cardHeader}>
        <h3 className={styles.sectionTitle}>Payment</h3>
        <span className="text-sm text-gray-500">Card details</span>
      </header>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Name on card
            </label>
            <input
              {...register("payment.cardName")}
              className="w-full rounded-lg border-gray-300"
              placeholder="John Doe"
            />
            {errors.payment?.cardName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.payment.cardName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Card number
            </label>
            <input
              inputMode="numeric"
              {...register("payment.cardNumber")}
              className="w-full rounded-lg border-gray-300"
              placeholder="•••• •••• •••• ••••"
            />
            {errors.payment?.cardNumber && (
              <p className="text-red-600 text-sm mt-1">
                {errors.payment.cardNumber.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">MM</label>
              <input
                {...register("payment.expiryMonth")}
                className="w-full rounded-lg border-gray-300"
                placeholder="MM"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">YYYY</label>
              <input
                {...register("payment.expiryYear")}
                className="w-full rounded-lg border-gray-300"
                placeholder="YYYY"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">CVC</label>
              <input
                {...register("payment.cvc")}
                className="w-full rounded-lg border-gray-300"
                placeholder="123"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">
              Billing address
            </label>
            <input
              {...register("payment.billingAddress")}
              className="w-full rounded-lg border-gray-300"
              placeholder="Street, number"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">City</label>
            <input
              {...register("payment.city")}
              className="w-full rounded-lg border-gray-300"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">ZIP</label>
            <input
              {...register("payment.zip")}
              className="w-full rounded-lg border-gray-300"
              placeholder="ZIP"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Country</label>
            <input
              {...register("payment.country")}
              className="w-full rounded-lg border-gray-300"
              placeholder="Country"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
