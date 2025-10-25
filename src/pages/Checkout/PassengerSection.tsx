import type { CheckoutFormValues } from "@/validations/CheckoutSchema";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<CheckoutFormValues>;
  index?: number; // Passenger number label
  typeLabel?: string; // "Adult" | "Child" | etc.
};

export default function PassengerCard({
  form,
  index = 1,
  typeLabel = "Adult",
}: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  // Convenience error helpers
  const err = errors.passenger;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <header className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 12c2.761 0 5-2.69 5-6s-2.239-6-5-6-5 2.69-5 6 2.239 6 5 6Zm0 2c-4.418 0-8 2.91-8 6.5V23h16v-2.5C20 16.91 16.418 14 12 14Z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">
              Passenger {index}
            </p>
            <p className="text-sm text-gray-500">{typeLabel}</p>
          </div>
        </div>
      </header>

      {/* Title / Gender (Mr/Ms etc.) */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-sm font-medium text-gray-900">
          Title
        </legend>
        <div className="flex items-center gap-6">
          <Controller
            name="passenger.title"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-6">
                {["Mr", "Ms"].map((t) => (
                  <label key={t} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      value={t}
                      checked={field.value === t}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="h-5 w-5 appearance-none rounded-full border border-gray-300 outline-none ring-2 ring-transparent checked:border-blue-600 checked:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-200"
                      aria-label={t}
                    />
                    <span className="text-sm text-gray-900">{t}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
        {err?.title && (
          <p className="mt-2 text-sm text-red-600">
            {err.title.message as string}
          </p>
        )}
      </fieldset>

      {/* Names */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-1 block text-sm text-gray-700"
            htmlFor="passenger.firstName"
          >
            First name
          </label>
          <input
            id="passenger.firstName"
            type="text"
            placeholder="First name"
            {...register("passenger.firstName")}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            aria-invalid={!!err?.firstName || undefined}
          />
          {err?.firstName && (
            <p className="mt-2 text-sm text-red-600">
              {err.firstName.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-1 block text-sm text-gray-700"
            htmlFor="passenger.lastName"
          >
            Last name
          </label>
          <input
            id="passenger.lastName"
            type="text"
            placeholder="Last name"
            {...register("passenger.lastName")}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            aria-invalid={!!err?.lastName || undefined}
          />
          {err?.lastName && (
            <p className="mt-2 text-sm text-red-600">
              {err.lastName.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Date of birth - mm / dd / yyyy */}
      <div className="mt-4">
        <label className="mb-1 block text-sm text-gray-700">
          Date of birth
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="mm"
            maxLength={2}
            {...register("passenger.dob.month")}
            className="w-16 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-center"
            aria-invalid={!!err?.dob?.month || undefined}
          />
          <span className="text-gray-400">/</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="dd"
            maxLength={2}
            {...register("passenger.dob.day")}
            className="w-16 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-center"
            aria-invalid={!!err?.dob?.day || undefined}
          />
          <span className="text-gray-400">/</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="yyyy"
            maxLength={4}
            {...register("passenger.dob.year")}
            className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-center"
            aria-invalid={!!err?.dob?.year || undefined}
          />
        </div>

        {(err?.dob?.month || err?.dob?.day || err?.dob?.year) && (
          <p className="mt-2 text-sm text-red-600">
            {(err?.dob?.month?.message as string) ??
              (err?.dob?.day?.message as string) ??
              (err?.dob?.year?.message as string)}
          </p>
        )}
      </div>
    </section>
  );
}
