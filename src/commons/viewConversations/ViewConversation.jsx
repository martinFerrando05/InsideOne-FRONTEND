import React from 'react';
import leftArrow from '../../assets/icons/leftArrow.svg';
import './viewConversation.scss';
import { Chart as ChartJS } from 'chart.js/auto'; // do not delete
import { Line } from 'react-chartjs-2';

const viewConversation = ({ handleDisplayConversation, selectedReport, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay-conversation')) {
            onClose();
        }
    };

    const keyWords = selectedReport.conversation
        .slice(1)
        .map((e) => {
            if (Array.isArray(e.keywords)) {
                return e.keywords;
            }
        })
        .filter((e) => {
            if (typeof e != 'undefined') {
                return e;
            }
        });

    const ratings = selectedReport.conversation
        .slice(1)
        .map((e) => {
            if (e.rating) {
                return e.rating;
            }
        })
        .filter((e) => {
            if (typeof e != 'undefined') {
                return e;
            }
        });

    const data = {
        labels: keyWords,
        datasets: [
            {
                label: 'Linea de conversación',
                data: ratings,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15,
            },
        ],
    };

const config = {
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
            },
        },
    },
};


    return (
        <div className="modal-overlay-conversation" onClick={handleOverlayClick}>
            <div className="modal-conversation">
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
                                assistant: 'Asistente',
                            };
                            return (
                                <p key={i} style={{ marginTop: '40px' }}>
                                    <span>{roles[role]}:</span>
                                    {content}
                                </p>
                            );
                        })}
                    </div>
                    <Line options={config} data={data} />
                </div>
            </div>
        </div>
    );
};

export default viewConversation;
