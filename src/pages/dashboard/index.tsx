import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./index.scss";
import FormControl from "../../components/booking/FormControl";
import ServiceFeatures from "../../components/booking/ServiceFeatures";
import FlightDealsCarousel from "../../components/FlightDealsCarousel";
import TrendingCitiesCarousel from "../../components/TrendingCitiesCarousel";
import AccountTravelSection, {
  FeatureItemContainer,
} from "../../components/AccountTravelSection";
import PopularDestinationsCarousel from "../../components/PopularDestinationsCarousel";

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Scroll to form when tab is specified in URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      // Scroll to the form section after a short delay to ensure it's rendered
      setTimeout(() => {
        const formElement = document.querySelector(".flight-search-container");
        if (formElement) {
          formElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <>
      <div className="main_container mx-2 sm:mx-4 lg:mx-8">
        <FormControl />
        <ServiceFeatures />
        <FlightDealsCarousel />
        <TrendingCitiesCarousel />
        <AccountTravelSection />
      </div>
      <FeatureItemContainer />
      <div className="main_container">
        <PopularDestinationsCarousel />
      </div>
    </>
  );
};

export default Dashboard;
