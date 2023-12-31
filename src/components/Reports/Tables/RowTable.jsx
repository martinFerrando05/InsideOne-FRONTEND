import React from "react";
import "./rowTable.scss";
import { useLocation } from "react-router";
import truncateFunctions from "../../../utils/truncateFunctions";
import { useSelector } from "react-redux";

const RowTable = ({ openModal }) => {
  const location = useLocation();
  const isConversationsView = location.pathname === "/conversations";
  const { paginatedData } = useSelector((store) => store.firestoreReducer);

  return (
    <tbody>
      {paginatedData &&
        paginatedData?.map((el, i) => {
          return isConversationsView ? (
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
          ) : (
            
            <tr key={i} style={{ cursor: "auto" }}>
              <td>{el?.agentName && truncateFunctions(el?.agentName)}</td>
              <td className="bold center-text">{el.totalInteractions}</td>
              <td className="center-text">{el.promediumTotalRating + "%"}</td>
              <td className="center-text">
                <p
                  style={{ width: "50%" }}
                  className={
                    el.satisfactionPromediumIndex == "Bajo"
                      ? "status-negative center-text"
                      : el.satisfactionPromediumIndex == "Medio"
                      ? "status-medium center-text"
                      : "status-positive center-text"
                  }
                >
                  {el.satisfactionPromediumIndex}
                </p>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default RowTable;
