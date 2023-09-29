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
        <div className="charts_container">
            <div className="donut_charts">
                <Doughnut className="donut" data={indexData} options={options} />
                <Doughnut data={hoursData} options={options} className="donut" />
            </div>
            <div className="bar_charts">
                <Bar className='bar' data={interactionsData} options={options} />
            </div>
        </div>
    );
};

export default DoughnutChart;
