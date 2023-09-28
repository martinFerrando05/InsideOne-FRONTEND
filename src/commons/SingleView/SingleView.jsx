import React, { useState } from "react";
//styles
import "./singleViewStyles.scss";
//img
import icon from '../../assets/icons/el_bichito.png'
//icons
import face from "../../assets/icons/face.svg";
import battery from "../../assets/icons/battery.svg";
import calendar from "../../assets/icons/calendar.svg";
import chart from "../../assets/icons/chart.svg";
import key from "../../assets/icons/key.svg";
import message from "../../assets/icons/message.svg";
import paper from "../../assets/icons/paper.svg";
import cross from "../../assets/icons/cross.svg";
import ViewConversation from "../viewConversations/ViewConversation";

const SingleView = ({ isOpen, onClose, selectedReport }) => {
  if (!isOpen) return null;
  const date = selectedReport?.date.split("T")[0];
  const [conversationModal, setConversationModal] = useState(false)

  const handleDisplayConversation = () => {
    setConversationModal(!conversationModal)
  }

  return (
    <div className="modal-overlay">
      <div className="modal" >
        <button className="close-button" onClick={onClose}>
          <img src={cross}/>
        </button>

        <ul className="modal-cont-item">
          <img src={icon} className="main-icon"></img>
          <h1>Reporte</h1>
          <div className="subtitle">
            <h3>Análisis de emociones</h3>
          </div>

          <div style={{marginTop:"10px"}}>
            <button className="showConversationButton" onClick={handleDisplayConversation}>
              Ver Conversación
            </button> 
          </div>

          {
            conversationModal ? <ViewConversation handleDisplayConversation={handleDisplayConversation} selectedReport={selectedReport}/> : ""
          }

          <div className="container-options" >
          <li className="options" >
            <img src={battery} />
            <p>Indice: {selectedReport?.client.satisfaction_index}</p>
          </li>
          <li className="options">
            <img src={chart} />
            <p>Rating: {selectedReport?.client.rating}</p>
          </li>
          <li className="options">
            <img src={face} />
            <p>Emociones: {selectedReport?.client.emotions}</p>
          </li>
          <li className="options">
            <img src={key} />
            <p>Palabras clave: {selectedReport?.client.keywords}</p>
          </li>
          <li className="options">
            <img src={calendar} />
            <p>Fecha: {date}</p>
          </li>
          <li className="options">
            <img src={paper} />
            <p>Resumen: {selectedReport?.client.summary}</p>
          </li>
          <li className="options">
            <img src={message} />
            <p>Comentarios: {selectedReport?.client.question}</p>
          </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SingleView;
