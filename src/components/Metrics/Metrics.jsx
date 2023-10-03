import React from 'react';
import './metrics.scss';
import Charts from '../../commons/Chart/Charts';

const Metrics = () => {
    return (
        <div className='metrics__main'>
            <h1>MÉTRICAS</h1>
            <div className='chart__main'>
            <Charts />
            </div>
        </div>
    );
};

export default Metrics;
