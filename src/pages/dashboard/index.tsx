import React from "react";

import "./index.scss";
import FormControl from "../../components/booking/FormControl";
import ServiceFeatures from "../../components/booking/ServiceFeatures";

const Dashboard: React.FC = () => {
  return (
    <>
      <FormControl />
      <ServiceFeatures />
    </>
  );
};

export default Dashboard;
