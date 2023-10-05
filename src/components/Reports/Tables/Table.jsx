import React from "react";
import "./table.scss";
import RowTable from "./RowTable";
import { useLocation } from "react-router";

const Table = ({ openModal }) => {
  const location = useLocation();

  return (
    <section className="table__body">
      <table>
        <thead>
          {location.pathname === "/conversations" ? (
            <tr>
              <th style={{ borderRadius: "10px 0px 0px 10px" }}>
                Fecha y Horario
              </th>
              <th>Calificación</th>
              <th className="table__cell center-text">Índice</th>
              <th style={{ paddingLeft: "6%" }}>Teléfono</th>
              <th>DNI</th>
              <th style={{ borderRadius: "0px 10px 10px 0px" }}>Agente</th>
            </tr>
          ) : (
            <tr>
              <th style={{ borderRadius: "10px 0px 0px 10px" }}>Nombre</th>
              <th className="bold table__cell center-text">Interacciones</th>
              <th className="center-text">Rating Promedio</th>
              <th
                className="center-text"
                style={{ borderRadius: "0px 10px 10px 0px" }}
              >
                Indice Promedio
              </th>
            </tr>
          )}
        </thead>
        <RowTable openModal={openModal} />
      </table>
    </section>
  );
};

export default Table;
