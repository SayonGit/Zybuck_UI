import React from "react";

import "./index.scss";
import FormControl from "../../components/booking/FormControl";
import ServiceFeatures from "../../components/booking/ServiceFeatures";
import FlightDealsCarousel from "../../components/FlightDealsCarousel";
import TrendingCitiesCarousel from "../../components/TrendingCitiesCarousel";
import AccountTravelSection, {
  FeatureItemContainer,
} from "../../components/AccountTravelSection";
import PopularDestinationsCarousel from "../../components/PopularDestinationsCarousel";
import Footer from "../../components/Footer";

const Dashboard: React.FC = () => {
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
      <Footer />
    </>
  );
};

export default Dashboard;
