import React from 'react';
import './donutChart.scss';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSelector } from 'react-redux';

const DoughnutChart = () => {
    const items = useSelector((store) => store.firestoreReducer.data);
    const length = items?.length;

    const counts = {
        Alto: 0,
        Medio: 0,
        Bajo: 0,
    };

    items?.forEach((el) => {
        if (el.indice in counts) {
            counts[el.indice]++
        }
    })
    
    const percentages = {
        Alto: (counts.Alto / length) * 100,
        Medio: (counts.Medio / length) * 100,
        Bajo: (counts.Bajo / length) * 100,
    }

    const data = {
        labels: ['Alto', 'Medio', 'Bajo'],
        datasets: [
            {
                data: [percentages.Alto, percentages.Medio, percentages.Bajo],
                backgroundColor: ['rgba(108,190,191,255)', 'rgba(248,206,107,255)', 'rgba(237,110,133,255)'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="dona">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
