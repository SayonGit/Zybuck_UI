// components/FlightResults/LoadingDots.tsx
export const LoadingDots = () => (
  <div className="flex justify-center items-center py-4">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      <div
        className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  </div>
);
