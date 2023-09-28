import React from "react";
import "./Sidebar.scss";
import logoInside from "../../assets/icons/Screenshot_from_2023-09-28_11-45-11-transformed.png";
import donutIcon from "../../assets/icons/donut.svg";
import reportsIcon from "../../assets/icons/reports.svg";
import responsesIcon from "../../assets/icons/responses.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div style={{ width: "100%" }}>
        <img src={logoInside} alt="" width={200} height={80} />
        <hr className="bar" />
      </div>

      <ul className="list">
        <Link to={"/metrics"}>
          <li className="item-list">
            <img src={donutIcon} alt="" height={30} className="icon-size" />
            <p>Metricas </p>
          </li>
        </Link>

        <Link to={"/reports"}>
          <li className="item-list">
            <img src={reportsIcon} alt="" height={30} className="icon-size" />
            <p>Reportes </p>
          </li>
        </Link>

        <Link to={"/answers"}>
          <li className="item-list">
            <img src={responsesIcon} alt="" height={30} className="icon-size" />
            <p>Respuestas </p>
          </li>
        </Link>
      </ul>
    </section>
  );
};

export default Sidebar;
