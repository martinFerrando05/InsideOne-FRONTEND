import React from 'react';
import './metrics.scss';
import DonutChart from '../../commons/Donut/DonutChart';

const Metrics = () => {
    return (
        <div>
            <h1 className='titulazo'>METRICAS</h1>
            <DonutChart />
        </div>
    );
};

export default Metrics;
