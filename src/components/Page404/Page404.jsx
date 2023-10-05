import React from 'react';
import { useNavigate } from 'react-router';
import './page404.scss';

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div className="page404__main">
            <div className="page404__button-container">
                <button onClick={() => navigate('/metrics')}>Volver al inicio</button>
            </div>
        </div>
    );
};

export default Page404;
