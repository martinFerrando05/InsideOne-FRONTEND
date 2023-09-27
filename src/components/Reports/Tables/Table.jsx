import React, { useEffect } from "react";
import "./table.scss";
import RowTable from "./RowTable";
import { useLocation } from "react-router";


const individualViews = ["Fecha y Hora", "Calificación", "Índice", "Emociones"]
const answersViews = ["Fecha", "Número", "DNI", "Agente", "Canal"]

const Table = ({ openModal }) => {
  const location = useLocation();
  const isIndividualView = location.pathname === '/individual'

  const viewsToRender = isIndividualView ? individualViews : answersViews;

  return (
    <section className="table__body">
      <table>
        <thead>
          <tr>
            {viewsToRender.map((view, index) => (
              <th
                key={index}
                className={`table__cell ${
                  index === 0 ? "border-radius-left" : ""
                } ${index === viewsToRender.length - 1 ? "border-radius-right" : ""}`}
                style={{ textAlign: index === 2 ? "center" : "" }}
              >
                {view}
              </th>
            ))}
          </tr>
        </thead>
        <RowTable openModal={openModal} />
      </table>
    </section>
  );
};

export default Table;
