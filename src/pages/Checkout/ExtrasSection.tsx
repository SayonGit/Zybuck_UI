import { type UseFormReturn } from "react-hook-form";
import styles from "./Checkout.module.scss";
import type { CheckoutFormValues } from "@/validations/CheckoutSchema";

type Props = { form: UseFormReturn<CheckoutFormValues> };

export default function ExtrasSection({ form }: Props) {
  const { register, watch } = form;
  const baggage = watch("extras.baggage");

  return (
    <section className={`${styles.card} overflow-hidden`}>
      <header className={styles.cardHeader}>
        <h3 className={styles.sectionTitle}>Extras</h3>
        <span className={styles.priceBadge}>Optional</span>
      </header>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="None"
                {...register("extras.baggage")}
              />
              <span className="text-sm text-gray-700">No checked bag</span>
            </label>
          </div>
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="15kg"
                {...register("extras.baggage")}
              />
              <span className="text-sm text-gray-700">15kg checked bag</span>
            </label>
          </div>
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="23kg"
                {...register("extras.baggage")}
              />
              <span className="text-sm text-gray-700">23kg checked bag</span>
            </label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("extras.insurance")} />
              <span className="text-sm text-gray-700">
                Travel insurance (optional)
              </span>
            </label>
          </div>
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("extras.prime")} />
              <span className="text-sm text-gray-700">Membership savings</span>
            </label>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Selected baggage:{" "}
          <span className="font-medium text-gray-700">{baggage || "None"}</span>
        </p>
      </div>
    </section>
  );
}
