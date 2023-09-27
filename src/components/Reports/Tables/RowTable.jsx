import React from "react";
import "./rowTable.scss";
import { useSelector } from "react-redux";

const RowTable = ({ openModal }) => {
  const items = useSelector((store) => store.firestoreReducer.data);
  const location = useLocation();
  const isIndividualView = location.pathname === "/individual";

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
        let fechaHora;
        let formateador = new Intl.DateTimeFormat("es-ES", opciones);
        let fechaHoraFormateada;
        if (el.fecha) {
          fechaHora = new Date(el.fecha);
          fechaHoraFormateada = formateador.format(fechaHora);
        }

        return isIndividualView ? (
          <tr key={i} className="item" onClick={() => openModal(el)}>
            <td>
              {el.fecha
                ? fechaHoraFormateada.split("G")[0]
                : "Fecha no registrada"}
            </td>
            <td>{el.rating}%</td>
            <td>
              <p
                className={
                  parseInt(el.rating) < 40
                    ? "status-negative"
                    : parseInt(el.rating) >= 40 && parseInt(el.rating) < 70
                    ? "status-medium"
                    : "status-positive"
                }
              >
                {el.indice}
              </p>
            </td>
            <td className="center-text">{el.emotions}</td>
          </tr>
        ) : (
          <tr key={i} className="item" onClick={() => openModal(el)}>
            <td>{el.fecha}</td>
            <td>{el.numero}</td>
            <td>{el.dni}</td>
            <td>{el.agente}</td>
            <td>{el.canal}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default RowTable;
