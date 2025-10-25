import {
  currencySigns,
  airlineNamedLogos,
  type AirlineNamedLogo,
} from "@/staticData/currencySigns";

export const transformFlightOffers = (response: any) => {
  if (!response?.data || !Array.isArray(response.data))
    return { recommended: [], cheapest: [], quickest: [], best: [] };

  const flights = response.data
    .map((offer: any, idx: number) => {
      const itineraries = offer.itineraries || [];
      if (!itineraries.length) return null;

      // ---- Outbound ----
      const firstItinerary = itineraries[0];
      const firstSegment = firstItinerary.segments[0];
      const lastSegment =
        firstItinerary.segments[firstItinerary.segments.length - 1];

      const airlineCode =
        offer.validatingAirlineCodes?.[0] || firstSegment?.carrierCode;
      const airlineInfo = airlineNamedLogos.find((a) => a.iata === airlineCode);

      const airline = airlineInfo?.name || airlineCode;
      const logo = airlineInfo?.logo || "";

      const departureTime = formatTime(firstSegment?.departure?.at);
      const arrivalTime = formatTime(lastSegment?.arrival?.at);
      const route = `${firstSegment?.departure?.iataCode} - ${lastSegment?.arrival?.iataCode}`;
      const stops =
        firstItinerary.segments.length > 1
          ? firstItinerary.segments.length - 1
          : null;
      const stopDetails = computeStopDetails(firstItinerary.segments);
      const duration = formatDuration(firstItinerary.duration);
      const durationMinutes = getDurationInMinutes(firstItinerary.duration);

      // ---- Pricing ----
      const adultPricing = offer.travelerPricings?.find(
        (tp: any) => tp.travelerType === "ADULT"
      );
      const totalPrice = parseFloat(adultPricing?.price?.total || "0");
      const basePrice = parseFloat(adultPricing?.price?.base || "0");
      const currency = adultPricing?.price?.currency || offer.price?.currency;
      const price = `${currencySigns[currency] || ""} ${totalPrice.toFixed(2)}`;

      const priceDetails = {
        currency,
        base: basePrice,
        total: totalPrice,
        grandTotal: parseFloat(offer.price?.grandTotal || totalPrice),
        travelerPricings: offer.travelerPricings,
      };

      const travelDate = new Date(firstSegment?.departure?.at);
      const flightNumber = firstItinerary.segments
        .map((seg: any) => `${seg.carrierCode} ${seg.number}`)
        .join(" / ");
      const aircraft = firstItinerary.segments
        .map((seg: any) => seg.aircraft?.code)
        .join(" / ");

      const baggage = {
        checkedBaggage: `${
          offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
            ?.includedCheckedBags?.weight || 15
        }kg`,
        carryOn: `${
          offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
            ?.includedCabinBags?.weight || 7
        }kg`,
      };

      const amenities = {
        wifi: false,
        entertainment: true,
        meals: hasAmenity(offer, "MEAL"),
        powerOutlets: true,
        streaming: false,
        snacks: true,
        blanket: true,
      };

      // ---- Round Trip (Return) ----
      let returnDetails: any = null;
      if (itineraries.length > 1) {
        const returnItinerary = itineraries[1];
        const retFirst = returnItinerary.segments[0];
        const retLast =
          returnItinerary.segments[returnItinerary.segments.length - 1];
        const returnAirlineCode =
          retFirst?.carrierCode || offer.validatingAirlineCodes?.[0];
        const returnAirlineInfo = airlineNamedLogos.find(
          (a) => a.iata === returnAirlineCode
        );

        const returnAirline = returnAirlineInfo?.name || returnAirlineCode;
        const returnLogo = returnAirlineInfo?.logo || logo;

        const returnPriceDetails = {
          currency,
          base: basePrice,
          total: totalPrice,
          grandTotal: parseFloat(offer.price?.grandTotal || totalPrice),
          travelerPricings: offer.travelerPricings,
        };

        returnDetails = {
          airline: returnAirline,
          logo: returnLogo,
          route: `${retFirst?.departure?.iataCode} - ${retLast?.arrival?.iataCode}`,
          departure: formatTime(retFirst?.departure?.at),
          arrival: formatTime(retLast?.arrival?.at),
          duration: formatDuration(returnItinerary.duration),
          durationMinutes: getDurationInMinutes(returnItinerary.duration),
          stops:
            returnItinerary.segments.length > 1
              ? returnItinerary.segments.length - 1
              : null,
          stopDetails: computeStopDetails(returnItinerary.segments),
          flightNumber: returnItinerary.segments
            .map((seg: any) => `${seg.carrierCode} ${seg.number}`)
            .join(" / "),
          aircraft: returnItinerary.segments
            .map((seg: any) => seg.aircraft?.code)
            .join(" / "),
          price: `${currencySigns[currency] || ""} ${totalPrice.toFixed(2)}`,
          priceDetails: returnPriceDetails,
          baggage,
          amenities,
          seatConfiguration: "3-3-3",
          travelDate: new Date(retFirst?.departure?.at),
        };
      }

      return {
        id: idx + 1,
        airline,
        logo,
        route,
        departure: departureTime,
        arrival: arrivalTime,
        duration,
        durationMinutes,
        from: `${firstSegment?.departure?.iataCode} Airport (${firstSegment?.departure?.iataCode})`,
        to: `${lastSegment?.arrival?.iataCode} Airport (${lastSegment?.arrival?.iataCode})`,
        travelDate,
        stops,
        stopDetails,
        price,
        priceDetails,
        flightNumber,
        aircraft,
        bookingClass:
          offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
          "Economy",
        dealType: "Recommended",
        baggage,
        amenities,
        seatConfiguration: "3-3-3",
        roundTrip: returnDetails,
      };
    })
    .filter(Boolean);

  return categorizeFlights(flights);
};

// ---------- Helper Functions ----------

const formatTime = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDuration = (isoDuration: string) => {
  if (!isoDuration) return "";
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return "";
  const hours = match[1] ? match[1].replace("H", "h ") : "";
  const minutes = match[2] ? match[2].replace("M", "m") : "";
  return `${hours}${minutes}`.trim();
};

const getDurationInMinutes = (isoDuration: string) => {
  if (!isoDuration) return 0;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = match?.[1] ? parseInt(match[1]) : 0;
  const minutes = match?.[2] ? parseInt(match[2]) : 0;
  return hours * 60 + minutes;
};

const formatAirportName = (segPoint: any) => {
  const iata = segPoint?.iataCode || "";
  const full = segPoint?.name || segPoint?.airportName || null;
  return full ? `${full} (${iata})` : `${iata} Airport (${iata})`;
};

const computeStopDetails = (segments: any[]) => {
  if (!segments || segments.length === 0) return [];
  return segments.map((segment, idx) => {
    const departure = segment.departure || {};
    const arrival = segment.arrival || {};
    const carrier = segment.carrierCode || "";
    const number = segment.number || "";

    return {
      leg: `${departure.iataCode} → ${arrival.iataCode}`,
      departureTime: formatTime(departure.at),
      arrivalTime: formatTime(arrival.at),
      duration: formatDuration(segment.duration),
      departureAirport: formatAirportName(departure),
      arrivalAirport: formatAirportName(arrival),
      carrierCode: carrier,
      flightNumber: `${carrier} ${number}`,
      terminal: {
        departure: departure.terminal || "N/A",
        arrival: arrival.terminal || "N/A",
      },
      segmentIndex: idx + 1,
    };
  });
};

const hasAmenity = (offer: any, type: string) => {
  return offer.travelerPricings?.some((trav: any) =>
    trav.fareDetailsBySegment?.some((seg: any) =>
      seg.amenities?.some((a: any) => a.amenityType === type)
    )
  );
};

const categorizeFlights = (flights: any[]) => {
  if (!flights.length)
    return { recommended: [], cheapest: [], quickest: [], best: [] };

  const normalize = (val: number, min: number, max: number) =>
    max === min ? 1 : (val - min) / (max - min);

  const prices = flights.map((f) => f.priceDetails.total);
  const durations = flights.map((f) => f.durationMinutes);
  const stops = flights.map((f) => f.stops || 0);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const minStops = Math.min(...stops);
  const maxStops = Math.max(...stops);

  // Compute scores once
  const scoredFlights = flights.map((flight) => {
    const priceScore =
      1 - normalize(flight.priceDetails.total, minPrice, maxPrice);
    const durationScore =
      1 - normalize(flight.durationMinutes, minDuration, maxDuration);
    const stopScore = 1 - normalize(flight.stops || 0, minStops, maxStops);

    return {
      ...flight,
      bestScore: priceScore * 0.4 + durationScore * 0.4 + stopScore * 0.2,
      recommendedScore:
        priceScore * 0.3 + durationScore * 0.6 + stopScore * 0.1,
    };
  });

  return {
    recommended: [...scoredFlights].sort(
      (a, b) => b.recommendedScore - a.recommendedScore
    ),
    cheapest: [...scoredFlights].sort(
      (a, b) => a.priceDetails.total - b.priceDetails.total
    ),
    quickest: [...scoredFlights].sort(
      (a, b) => a.durationMinutes - b.durationMinutes
    ),
    best: [...scoredFlights].sort((a, b) => b.bestScore - a.bestScore),
  };
};

export const getAllAirlines = (response: any): AirlineNamedLogo[] => {
  if (!response?.data || !Array.isArray(response.data)) return [];

  const airlinesSet = new Set<string>();

  response.data.forEach((offer: any) => {
    const airlineCodes =
      offer.validatingAirlineCodes ||
      offer.itineraries?.flatMap(
        (itinerary: any) =>
          itinerary.segments?.map((seg: any) => seg.carrierCode) || []
      ) ||
      [];

    airlineCodes.forEach((code: string) => airlinesSet.add(code));
  });

  const airlineCodes = Array.from(airlinesSet);
  return airlineNamedLogos.filter((logo) => airlineCodes.includes(logo.iata));
};
