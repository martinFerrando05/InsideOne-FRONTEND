import React from 'react';
import './metrics.scss';
import DonutChart from '../../commons/Chart/Charts';

const Metrics = () => {
    return (
        <div className='metrics__main'>
            <h1>METRICAS</h1>
            <div className='chart__main'>
            <DonutChart />
            </div>
        </div>
    );
};

export default Metrics;
