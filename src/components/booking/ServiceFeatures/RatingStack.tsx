import React from "react";
import { Icon } from "@iconify/react";
import styles from "./index.module.scss";

const StarRating: React.FC = () => {
  return (
    <div className={styles.star_rating_container}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          icon="material-symbols:star"
          className={styles.star_icon}
        />
      ))}
    </div>
  );
};

export default StarRating;
