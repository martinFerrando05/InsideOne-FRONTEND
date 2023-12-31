import React from "react";
import "./Sidebar.scss";
import logoInside from "../../assets/icons/Screenshot_from_2023-09-28_11-45-11-transformed.png";
import donutIcon from "../../assets/icons/donut.svg";
import reportsIcon from "../../assets/icons/reports.svg";
import agentsIcon from "../../assets/icons/support.svg";
import demoIcon from "../../assets/icons/demo.svg";
import cogIcon from '../../assets/icons/cog.svg'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div style={{ width: "100%" }}>
        <Link to={"/metrics"}>
          <img src={logoInside} alt="" width={200} height={80} />
        </Link>
        <hr className="bar" />
      </div>

      <ul className="list">
        <Link to={"/metrics"}>
          <li className="item-list">
            <img src={donutIcon} alt="" height={30} className="icon-size" />
            <p>Metricas </p>
          </li>
        </Link>

        <Link to={"/conversations"}>
          <li className="item-list">
            <img src={reportsIcon} alt="" height={30} className="icon-size" />
            <p>Conversaciones </p>
          </li>
        </Link>

        <Link to={"/agents"}>
          <li className="item-list">
            <img src={agentsIcon} alt="" height={30} className="icon-size" />
            <p>Agentes </p>
          </li>
        </Link>

        <Link to={"/emotions"}>
          <li className="item-list">
            <img src={demoIcon} alt="" height={30} className="icon-size" />
            <p>Demo </p>
          </li>
        </Link>
        <Link to={"/settings"}>
          <li className="item-list">
            <img src={cogIcon} alt="" height={30} className="icon-size" />
            <p>Ajustes </p>
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
