import React, { useEffect } from "react";
import "./rowTable.scss";
import { useLocation } from "react-router";
import truncateFunctions from "../../../utils/truncateFunctions";
import { useDispatch, useSelector } from "react-redux";


const RowTable = ({ openModal }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const isConversationsView = location.pathname === "/conversations";
  const { paginatedData } =
    useSelector((store) => store.firestoreReducer);

  return (
    <tbody>
      {isConversationsView && paginatedData
        ? paginatedData &&
          paginatedData?.map((el, i) => {
            return (
              <tr key={i} onClick={() => openModal(el)}>
                <td className="item-date">{el?.dateFormated}</td>
                <td className="item-rating">{el?.client?.rating}%</td>
                <td>
                  <p
                    className={
                      parseInt(el.client?.rating) < 40
                        ? "status-negative"
                        : parseInt(el.client?.rating) >= 40 &&
                          parseInt(el.client?.rating) < 70
                        ? "status-medium"
                        : "status-positive"
                    }
                  >
                    {el.client?.satisfaction_index}
                  </p>
                </td>
                <td style={{ paddingLeft: "6%" }}>{el.client?.phone_number}</td>
                <td>{el.client?.dni}</td>
                <td>{el.agent && truncateFunctions(el.agent)}</td>
              </tr>
            );
          })
        : paginatedData?.map((agent, i) => {
            return (
              <tr key={i} style={{ cursor: "auto" }}>
                <td>
                  {agent?.agentName && truncateFunctions(agent?.agentName)}
                </td>
                <td className="bold center-text">{agent.totalInteractions}</td>
                <td className="center-text">
                  {agent.promediumTotalRating + "%"}
                </td>
                <td className="center-text">
                  <p
                    style={{ width: "50%" }}
                    className={
                      agent.satisfactionPromediumIndex == "Bajo"
                        ? "status-negative center-text"
                        : agent.satisfactionPromediumIndex == "Medio"
                        ? "status-medium center-text"
                        : "status-positive center-text"
                    }
                  >
                    {agent.satisfactionPromediumIndex}
                  </p>
                </td>
              </tr>
            );
          })}
    </tbody>
  );
};

export default RowTable;
