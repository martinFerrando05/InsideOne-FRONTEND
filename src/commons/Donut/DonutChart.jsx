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
    const indexData = indexDataChart(items)
    const hoursData = hoursDataChart(items)
    const interactionsData = interactionsDataChart(items)

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="donut">
            <Doughnut data={indexData} options={options} />
            <Doughnut data={hoursData} options={options} />
            <Bar data={interactionsData} options={options} />
        </div>
    );
};

export default DoughnutChart;
