import React from "react";
import "./Totalizator.scss";

const Totalizator = ({ title, subtitle, quantity }) => {
  return (
    <div className="totalizator_container">
      <div className="data_container">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <p>
          {quantity.predominantSatisfactionIndexWeek &&
          quantity.predominantSatisfactionIndexWeek.length > 5
            ? quantity.predominantSatisfactionIndexWeek
            : quantity.predominantSatisfactionIndexDay &&
              quantity.predominantSatisfactionIndexDay.length > 5
            ? quantity.predominantSatisfactionIndexDay
            : ""}
        </p>
      </div>
      <p className="interactions_quantity">
        {quantity.todayInteractions
          ? quantity.todayInteractions
          : quantity.weekInteractions
          ? quantity.weekInteractions
          : quantity.predominantSatisfactionIndexWeek &&
            quantity.predominantSatisfactionIndexWeek.length <= 5
          ? quantity.predominantSatisfactionIndexWeek
          : quantity.predominantSatisfactionIndexDay &&
            quantity.predominantSatisfactionIndexDay.length <= 5
          ? quantity.predominantSatisfactionIndexDay
          : ""}
      </p>
    </div>
  );
};

export default Totalizator;
