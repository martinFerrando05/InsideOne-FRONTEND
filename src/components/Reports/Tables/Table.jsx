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
          {location.pathname === '/reports' ? 
          <tr>
            <th style={{borderRadius:"10px 0px 0px 10px"}}>Fecha y Horario</th>
            <th>Calificación</th>
            <th className="table__cell center-text" >Índice</th>
            <th className="table__cell" style={{borderRadius:"0px 10px 10px 0px", textAlign:"center"}}>Emociones</th>
          </tr> 
          :
          <tr>
          <th style={{borderRadius:"10px 0px 0px 10px"}}>Fecha</th>
            <th >Número</th>
            <th  >DNI</th>
            <th >Agente</th>
            <th style={{borderRadius:"0px 10px 10px 0px"}}>Canal</th>
          </tr>}
        </thead>
        <RowTable openModal={openModal} />
      </table>
    </section>
  );
};

export default Table;
