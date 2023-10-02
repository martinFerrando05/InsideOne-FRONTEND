import React from 'react';
import './donutChart.scss';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { indexDataChart } from '../../utils/indexDataChart';
import { hoursDataChart } from '../../utils/hoursDataChart';
import { interactionsDataChart } from '../../utils/interactionsDataChart';

const DoughnutChart = () => {
    const items = useSelector((store) => store.firestoreReducer.data);
    const indexData = indexDataChart(items);
    const hoursData = hoursDataChart(items);
    const interactionsData = interactionsDataChart(items);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: undefined,
            },
        },
    };

    const updatedTitle = (title, subtitle, boolean) => {
        return {
            options,
            plugins: {
                ...options.plugins,
                title: {
                    ...options.plugins.title,
                    text: title,
                    font: {
                        size: 26,
                    },
                },
                subtitle: {
                    ...options.plugins.title,
                    text: subtitle,
                    display: boolean,
                    font: {
                        size: 14,
                    },
                },
            },
        };
    };

    return (
        <div className="charts_container">
            <div className="donut_charts">
                <Doughnut className="donut" data={indexData} options={updatedTitle('Indice de Satisfacción (general)', 'Bajo - Medio - Alto', true)} />
                <Doughnut data={hoursData} options={updatedTitle('Atención al cliente (general)', 'Derivado a un agente - Fuera de horario')} className="donut" />
            </div>
            <div className="bar_charts">
                <Bar className="bar" data={interactionsData} options={updatedTitle('Interacciónes Semanales', 'Lunes a Viernes', true)} />
            </div>
        </div>
    );
};

export default DoughnutChart;
