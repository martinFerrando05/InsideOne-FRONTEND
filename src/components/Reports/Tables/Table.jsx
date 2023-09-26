import React, { useEffect } from "react";
import "./table.scss";
import RowTable from "./RowTable";

const Table = ({ items }) => {
  
  return (
    <section class="table__body">
      <table>
        <thead>
          <tr>
            <th class="table__cell" style={{borderRadius:"10px 0px 0px 10px"}}>Fecha y Horario</th>
            <th class="table__cell" >Calificación</th>
            <th class="table__cell center-text" >Índice</th>
            <th class="table__cell" style={{borderRadius:"0px 10px 10px 0px", textAlign:"center"}}>Emociones</th>
          </tr>
        </thead>
        <RowTable items={items}/>
      </table>
    </section>
  );
};

export default Table;
