import React from "react";
import "./rowTable.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { dateFormater } from "../../../utils/dateFormater";
import { specificAgentData } from "../../../utils/AgentsScreen/agents";

const RowTable = ({ openModal }) => {
  const location = useLocation();
  const items = useSelector((store) => store.firestoreReducer.data);
  const isConversationsView = location.pathname === "/conversations";
  const agentsScreenData = specificAgentData(items);
  const arrayRenderToAgentsData = [];

  const renderObjectWithAgentsProperties = () => {
    for (const key in agentsScreenData) {
      location.pathname != "/conversations"
        ? arrayRenderToAgentsData.push(
            <tr key={key} style={{cursor:"auto"}}>
              <td>{key.length > 20 ? key.slice(0, 20) + "..." : key}</td>
              <td className="bold center-text">{agentsScreenData[key].totalInteractions}</td>
              <td className="center-text">{agentsScreenData[key].promediumTotalRating + "%"}</td>
              <td className="center-text">
                <p
                  style={{ width: "50%" }}
                  className={
                    agentsScreenData[key].satisfactionPromediumIndex == "Bajo"
                      ? "status-negative center-text"
                      : agentsScreenData[key].satisfactionPromediumIndex ==
                        "Medio"
                      ? "status-medium center-text"
                      : "status-positive center-text"
                  }
                >
                  {agentsScreenData[key].satisfactionPromediumIndex}
                </p>
              </td>
            </tr>
          )
        : "";
    }
  };

  renderObjectWithAgentsProperties();

  return (
    <tbody>
      {isConversationsView
        ? items &&
          items?.map((el, i) => {
            return (
              <tr key={i} onClick={() => openModal(el)}>
                <td>{el.dateFormated}</td>
                <td>{el.client.rating}%</td>
                <td>
                  <p
                    className={
                      parseInt(el.client.rating) < 40
                        ? "status-negative"
                        : parseInt(el.client.rating) >= 40 &&
                          parseInt(el.client.rating) < 70
                        ? "status-medium"
                        : "status-positive"
                    }
                  >
                    {el.client.satisfaction_index}
                  </p>
                </td>
                <td className="center-text">{el.client.emotions.join(", ")}</td>
              </tr>
            );
          })
        : arrayRenderToAgentsData.length &&
          arrayRenderToAgentsData.map((el, i) => {
            return el;
          })}
    </tbody>
  );
};

export default RowTable;
