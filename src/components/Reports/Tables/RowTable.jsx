import React from "react";
import "./rowTable.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { dateFormater } from "../../../utils/dateFormater";
import truncateFunctions from "../../../utils/truncateFunctions";
import { specificAgentData } from "../../../utils/AgentsScreen/agents";

const RowTable = ({ openModal }) => {
  const paginatedItems = useSelector((store) => store.firestoreReducer.paginatedData);
  const location = useLocation();
  const isConversationsView = location.pathname === "/conversations";
  const agentsScreenData = specificAgentData(paginatedItems);
  const arrayRenderToAgentsData = [];

  const renderObjectWithAgentsProperties = () => {
    for (const key in agentsScreenData) {
      location.pathname != "/conversations"
        ? arrayRenderToAgentsData.push(
            <tr key={key} style={{ cursor: "auto" }}>
              <td>{truncateFunctions(key)}</td>
              <td className="bold center-text">
                {agentsScreenData[key].totalInteractions}
              </td>
              <td className="center-text">
                {agentsScreenData[key].promediumTotalRating + "%"}
              </td>
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
        ? paginatedItems &&
          paginatedItems?.map((el, i) => {
            return (
              <tr key={i} onClick={() => openModal(el)}>
                <td className="item-date">{el.dateFormated}</td>
                <td className="item-rating">{el.client.rating}%</td>
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
                <td style={{paddingLeft: "6%"}}>{el.client.phone_number}</td>
                <td>{el.client.dni}</td>
                <td>{truncateFunctions(el.agent)}</td>
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
