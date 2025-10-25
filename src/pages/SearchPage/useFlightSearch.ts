import axiosInstance from "@/axiosIntance";
import { useState, useCallback } from "react";

interface FlightOfferParams {
  fromCode: string;
  toCode: string;
  departureDate: string;
  returnDate?: string;
  adultsCnt: number;
  children: number;
  infants: number;
  nonStop?: boolean;
  class?: string;
}

export const useFlightOffers = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightOffers = useCallback(async (params: FlightOfferParams) => {
    const {
      fromCode,
      toCode,
      departureDate,
      returnDate,
      adultsCnt,
      children,
      infants,
      nonStop = false,
      class: travelClass = "ECONOMY",
    } = params;

    setLoading(true);
    setError(null);

    try {
      const query = `/v2/shopping/flight-offers?originLocationCode=${fromCode}&destinationLocationCode=${toCode}&departureDate=${departureDate}${
        returnDate ? `&returnDate=${returnDate}` : ""
      }&adults=${adultsCnt}&children=${children}&infants=${infants}&nonStop=${nonStop}&travelClass=${travelClass}&currencyCode=USD`;

      const response = await axiosInstance.get(query);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      console.error("API flight offers error:", err);
      setError(err.response?.data?.message || "Failed to fetch flight offers");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchFlightOffers };
};

export default useFlightOffers;
