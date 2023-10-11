import React, { useState } from "react";
import leftArrow from "../../assets/icons/leftArrow.svg"
import "./viewConversation.scss";

const viewConversation = ({ handleDisplayConversation, selectedReport, onClose }) => {

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay-conversation")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay-conversation" onClick={handleOverlayClick}>
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
            {selectedReport.conversation.slice(1).map(({ role, content }, i) => {
              const roles = {
                user: 'Cliente',
                assistant: 'Asistente'
              }
              return (
                  <p key={i} style={{ marginTop: '40px' }}>
                      <span >{roles[role]}:</span>
                      {content}
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
