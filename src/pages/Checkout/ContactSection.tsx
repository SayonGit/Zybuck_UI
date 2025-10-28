import type { CheckoutFormValues } from "@/validations/CheckoutSchema";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<CheckoutFormValues>;
};

// Country codes data
const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  // Add more as needed
];

// US States data
const usStates = [
  { code: "AK", name: "Alaska" },
  { code: "AL", name: "Alabama" },
  { code: "AR", name: "Arkansas" },
  { code: "AZ", name: "Arizona" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  // Add all states as needed
];

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "IN", name: "India" },
  // Add more countries
];

export default function ContactDetailsCard({ form }: Props) {
  const {
    register,
    control,
    formState: { errors },
    // watch,
  } = form;

  // const selectedCountry = watch("contact.country");
  const contactErrors = errors.contact;

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm ">
      <header className="mb-2  pt-4 pl-4 sm:pt-6 sm:pl-6">
        <h2 className="text-lg font-semibold text-gray-900">Contact details</h2>
      </header>

      <div className="space-y-4 p-4 sm:p-6">
        {/* Email Fields Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact.email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="contact.email"
              type="email"
              placeholder="Email address"
              {...register("contact.email")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-invalid={!!contactErrors?.email}
            />
            {contactErrors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact.emailConfirm"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm email address
            </label>
            <input
              id="contact.emailConfirm"
              type="email"
              placeholder="Confirm email address"
              {...register("contact.emailConfirm")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-invalid={!!contactErrors?.emailConfirm}
            />
            {contactErrors?.emailConfirm && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.emailConfirm.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Phone Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country code
            </label>
            <Controller
              name="contact.phoneCode"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <select
                    {...field}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  >
                    {countryCodes.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.flag} {item.country} ({item.code})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            />
            {contactErrors?.phoneCode && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.phoneCode.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact.phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              id="contact.phone"
              type="tel"
              placeholder="Phone number"
              {...register("contact.phone")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-invalid={!!contactErrors?.phone}
            />
            {contactErrors?.phone && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.phone.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Address Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact.billingAddress"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Billing address
            </label>
            <input
              id="contact.billingAddress"
              type="text"
              placeholder="Billing address"
              {...register("contact.billingAddress")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-invalid={!!contactErrors?.billingAddress}
            />
            {contactErrors?.billingAddress && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.billingAddress.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact.zipCode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ZIP Code
            </label>
            <input
              id="contact.zipCode"
              type="text"
              placeholder="ZIP Code"
              {...register("contact.zipCode")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-invalid={!!contactErrors?.zipCode}
            />
            {contactErrors?.zipCode && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.zipCode.message as string}
              </p>
            )}
          </div>
        </div>

        {/* City and State Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact.city"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              id="contact.city"
              type="text"
              placeholder="City"
              {...register("contact.city")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-invalid={!!contactErrors?.city}
            />
            {contactErrors?.city && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.city.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              State
            </label>
            <Controller
              name="contact.state"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <select
                    {...field}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select state</option>
                    {usStates.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.code} - {state.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            />
            {contactErrors?.state && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.state.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Country Row */}
        <div className="grid gap-4 sm:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country
            </label>
            <Controller
              name="contact.country"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <select
                    {...field}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 sm:w-1/2"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 sm:right-1/2 sm:translate-x-full">
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            />
            {contactErrors?.country && (
              <p className="mt-1 text-sm text-red-600">
                {contactErrors.country.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 mb-2 p-4 text-sm text-gray-500 bg-gray-100">
        After booking, you will receive the confirmation by email, plus similar
        travel offers from time to time. If you do not wish to receive special
        deals,{" "}
        <button
          type="button"
          className="text-blue-600 underline hover:text-blue-800"
        >
          click here
        </button>
        .
      </div>
    </section>
  );
}
