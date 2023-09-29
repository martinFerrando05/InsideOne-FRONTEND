import React from "react";
import leftArrow from "../../assets/icons/leftArrow.svg";
import "./viewConversation.scss";
import { conversacion } from "../../utils/fakeData"

const viewConversation = ({ handleDisplayConversation, selectedReport }) => {
  return (
    <div className="modal-overlay-conversation">
      <div className="modal-conversation" >
        <button className="close-button-conversation" onClick={handleDisplayConversation}>
          <img src={leftArrow} />
        </button>

        <div className="modal-cont-item box-conversation">
          <h1>{selectedReport.agent}</h1>
          <div className="subtitle">
            <h3>Agente</h3>
          </div>
          <div className="conversation">
            {conversacion.map((dialogo, i) => {
              return (
                  <p key={i} style={{ marginTop: '40px' }}>
                      <span >{dialogo.split(':')[0]}:</span>
                      {dialogo.split(':')[1]}
                  </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default viewConversation;
