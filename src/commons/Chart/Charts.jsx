import React from "react";
import "./chart.scss";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from "react-redux";
import { indexDataChart } from "../../utils/indexDataChart";
import { hoursDataChart } from "../../utils/hoursDataChart";
import { interactionsDataChart } from "../../utils/interactionsDataChart";
import { indexPerDayDataChart } from "../../utils/indexPerDayDataChart";
import { dateFormater } from "../../utils/dateFormater";
import Totalizator from "../totalizator/Totalizator";
import {
  todayInteractionsData,
  weekInteractionsData,
  predominantSatisfactionIndexDay,
  predominantSatisfactionIndexWeek,
} from "../../utils/TotalizatorData/totalizatorData";

const DoughnutChart = () => {
  const items = useSelector((store) => store.firestoreReducer.data);
  const date = new Date()
  const indexData = indexDataChart(items);
  const indexDataDay = indexDataChart(items, date);
  const hoursData = hoursDataChart(items);
  const interactionData = interactionsDataChart(items);
  const indexPerDayData = indexPerDayDataChart(items)
  const currentDay = dateFormater(new Date()).split(" ")[0];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: undefined,
      },
    },
  };

  const totalizatorData = [
    {
      title: "Cantidad de Interacciones",
      subtitle: "Al " + currentDay,
      quantity: {
        todayInteractions: todayInteractionsData()?.length,
      },
    },
    {
      title: "Cantidad de Interacciones",
      subtitle: "Ultimos 7 dias",
      quantity: {
        weekInteractions: weekInteractionsData()?.length,
      },
    },
    {
      title: "Indice Predominante",
      subtitle: "Al " + currentDay,
      quantity: {
        predominantSatisfactionIndexDay: predominantSatisfactionIndexDay(),
      },
    },
    {
      title: "Indice Predominante",
      subtitle: "Ultimos 7 dias",
      quantity: {
        predominantSatisfactionIndexWeek: predominantSatisfactionIndexWeek(),
      },
    },
  ];

  const updatedTitle = (title, subtitle, boolean, legendBoolean) => {
    let titleFontSize = 26
    let subtitleFontSize = 14

    if (window.innerWidth <= 1440) {
      titleFontSize = 20
      subtitleFontSize = 12
    }
    return {
      options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          text: title,
          font: {
            size: titleFontSize,
          },
        },
        subtitle: {
          ...options.plugins.title,
          text: subtitle,
          display: boolean,
          font: {
            size: subtitleFontSize,
          },
        },
        legend: {
          display: legendBoolean,
        },
      },
    };
  };

  return (
    <div className="charts_container">
      <div className="totalizators_container">
        {totalizatorData[0].title &&
          totalizatorData?.map((item, i) => {
            return (
              <Totalizator
                key={i}
                title={item?.title}
                subtitle={item?.subtitle}
                quantity={item?.quantity}
              />
            );
          })}
      </div>
      <div className="donut_charts">
        <Doughnut
          className="donut"
          data={indexData}
          options={updatedTitle(
            "Indice de Satisfacción (general)",
            "Bajo - Medio - Alto",
            true, true
          )}
        />
          <Doughnut
            className="donut"
            data={indexDataDay}
            options={updatedTitle(
              "Indice de Satisfacción (hoy)",
              "Bajo - Medio - Alto",
              true, true
            )}
          />
        <Doughnut
          data={hoursData}
          options={updatedTitle(
            "Atención al cliente (general)",
          )}
          className="donut"
        />
      </div>
      <div className="bar_charts">
        <Bar
          className="bar"
          data={indexPerDayData}
          options={updatedTitle(
            "Promedio de índice de satisfacción",
            "Lunes a Viernes",
            true, false
          )}
        />
        <Bar
          className="bar"
          data={interactionData}
          options={updatedTitle(
            "Interacciónes Semanales",
            "Lunes a Viernes",
            true, true
          )}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;
