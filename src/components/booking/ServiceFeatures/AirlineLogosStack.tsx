import {
  AirIndiaLogo,
  AirCanadaLogo,
  AmericanExpressLogo,
  EmiratesLogo,
  QatarAirwaysLogo,
} from "../../../assets";
import styles from "./index.module.scss";

const AirlineLogosStack = () => {
  return (
    <div className={styles.image_stack_container}>
      <img src={AirIndiaLogo} alt="AirIndiaLogo" />
      <img src={AirCanadaLogo} alt="AirCanadaLogo" />
      <img src={EmiratesLogo} alt="EmiratesLogo" />
      <img src={QatarAirwaysLogo} alt="QatarAirwaysLogo" />
      <img src={AmericanExpressLogo} alt="AmericanExpressLogo" />
    </div>
  );
};

export default AirlineLogosStack;
