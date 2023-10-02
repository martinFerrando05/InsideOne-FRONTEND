import React from 'react';
import './metrics.scss';
import DonutChart from '../../commons/Donut/DonutChart';

const Metrics = () => {
    return (
        <div className='metrics__main'>
            <h1>MÉTRICAS</h1>
            <div className='chart__main'>
            <DonutChart />
            </div>
        </div>
    );
};

export default Metrics;
