import type { FC } from "react";

export const LoadingSpinner: FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <div className="relative w-16 h-16">
      {/* The main spinning ring */}
      <div className="animate-spin rounded-full h-full w-full border-4 border-t-yellow-500 border-b-yellow-500 border-gray-200"></div>
      {/* A pulsing dot in the center for extra visual flair */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-4 h-4 rounded-full bg-yellow-500 animate-ping"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
    {/* <p className="mt-4 text-lg text-gray-600 font-medium tracking-wider">
      Loading...
    </p> */}
  </div>
);
