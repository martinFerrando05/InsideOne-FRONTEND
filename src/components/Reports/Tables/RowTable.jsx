import React from "react";
import "./rowTable.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const RowTable = ({ openModal }) => {
  const items = useSelector((store) => store.firestoreReducer.data);
  const location = useLocation();
  const isReportsView = location.pathname === "/reports";

  // Opciones para formatear la fecha y hora en español
  const opciones = {
    year: "numeric",
    month: "numeric", // 'long' para el nombre completo del mes
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Formato de 24 horas
    timeZoneName: "short",
    timeZone: "America/Argentina/Buenos_Aires", // Ajusta la zona horaria según tu necesidad
  };

  return (
    <tbody>
      {items?.map((el, i) => {
        // let fechaHora;
        // let formateador = new Intl.DateTimeFormat("es-ES", opciones);
        // let fechaHoraFormateada;
        // if (el.fecha) {
        //   fechaHora = new Date(el.fecha);
        //   fechaHoraFormateada = formateador.format(fechaHora);
        // }

        return el.datos && isReportsView ? (
          <tr key={i} className="item" onClick={() => openModal(el)}>
            <td>
              {
                el.date
                // ? fechaHoraFormateada.split("G")[0]
                // : "Fecha no registrada"
              }
            </td>
            <td>{el.client.rating}%</td>
            <td>
              <p
                className={
                  parseInt(el.client.rating) < 40
                    ? "status-negative"
                    : parseInt(el.client.rating) >= 40 && parseInt(el.client.rating) < 70
                    ? "status-medium"
                    : "status-positive"
                }
              >
                {el.client.satisfaction_index}
              </p>
            </td>
            <td className="center-text">{el.client.emotions}</td>
          </tr>
        ) : (
          <tr key={i} className="item">
            <td>{el.date}</td>
            <td>{el.phone_number}</td>
            <td>{el.dni}</td>
            <td>{el.agent}</td>
            <td>{el.channel}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default RowTable;
