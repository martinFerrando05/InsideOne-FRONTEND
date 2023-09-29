import React, { useState } from 'react';
import ViewConversation from '../viewConversations/ViewConversation';
import { useLocation } from 'react-router';
//styles
import './singleViewStyles.scss';
//img
import icon from '../../assets/icons/el_bichito.png';
//icons
import face from '../../assets/icons/face.svg';
import battery from '../../assets/icons/battery.svg';
import calendar from '../../assets/icons/calendar.svg';
import chart from '../../assets/icons/chart.svg';
import key from '../../assets/icons/key.svg';
import message from '../../assets/icons/message.svg';
import paper from '../../assets/icons/paper.svg';
import cross from '../../assets/icons/cross.svg';
import phone from '../../assets/icons/phone.svg'
import dni from '../../assets/icons/dni.svg'
import support from '../../assets/icons/support.svg'
import clock from '../../assets/icons/clock.svg'


const SingleView = ({ isOpen, onClose, selectedReport }) => {
    if (!isOpen) return null;
    const date = selectedReport?.date.split('T')[0];
    const [conversationModal, setConversationModal] = useState(false);
    const location = useLocation();
    const isAnswersView = location.pathname === '/answers';

    const handleDisplayConversation = () => {
        setConversationModal(!conversationModal);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>
                    <img src={cross} alt="Close" />
                </button>

                <ul className="modal-cont-item">
                    <img src={icon} className="main-icon" alt="Main Icon" />
                    {!isAnswersView ? (
                        <div>
                            <h1>Reporte</h1>
                            <div className="subtitle">
                                <h3>Análisis de emociones</h3>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <button className="showConversationButton" onClick={handleDisplayConversation}>
                                    Ver Conversación
                                </button>
                            </div>

                            {conversationModal && <ViewConversation handleDisplayConversation={handleDisplayConversation} selectedReport={selectedReport} />}

                            <div className="container-options">
                                <li className="options">
                                    <img src={battery} alt="Battery" />
                                    <p>Indice: {selectedReport?.client.satisfaction_index}</p>
                                </li>
                                <li className="options">
                                    <img src={chart} alt="Chart" />
                                    <p>Rating: {selectedReport?.client.rating}</p>
                                </li>
                                <li className="options">
                                    <img src={face} alt="Face" />
                                    <p>Emociones: {selectedReport?.client.emotions.join(", ")}</p>
                                </li>
                                <li className="options">
                                    <img src={key} alt="Key" />
                                    <p>Palabras clave: {selectedReport?.client.keywords}</p>
                                </li>
                                <li className="options">
                                    <img src={calendar} alt="Calendar" />
                                    <p>Fecha: {selectedReport?.dateFormated.split(' ')[0]}</p>
                                </li>
                                <li className="options">
                                    <img src={clock} alt="Calendar" />
                                    <p>Hora: {selectedReport?.dateFormated.split(' ')[1]}</p>
                                </li>
                                <li className="options">
                                    <img src={paper} alt="Paper" />
                                    <p>Resumen: {selectedReport?.client.summary}</p>
                                </li>
                                <li className="options">
                                    <img src={message} alt="Message" />
                                    <p>Comentarios: {selectedReport?.client.question}</p>
                                </li>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2>{selectedReport?.campaign}</h2>
                            <div className="subtitle">
                                <h3>{selectedReport?.survey}</h3>
                            </div>

                            <div className="container-options answers">
                                <li className="options">
                                    <img src={phone} alt="Phone" />
                                    <p>Numero del cliente: {selectedReport?.client.phone_number}</p>
                                </li>
                                <li className="options">
                                    <img src={dni} alt="Dni" />
                                    <p>DNI del cliente: {selectedReport?.client.dni}</p>
                                </li>
                                <li className="options">
                                    <img src={support} alt="Support" />
                                    <p>Agente: {selectedReport?.agent}</p>
                                </li>
                                <li className="options">
                                    <img src={calendar} alt="Calendar" />
                                    <p>Fecha: {selectedReport?.dateFormated.split(' ')[0]}</p>
                                </li>
                                <li className="options">
                                    <img src={clock} alt="Calendar" />
                                    <p>Hora: {selectedReport?.dateFormated.split(' ')[1]}</p>
                                </li>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SingleView;
