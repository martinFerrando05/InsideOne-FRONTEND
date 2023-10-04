import React from 'react';
import './settings.scss';
import { setSettings, resetSettings } from '../../store/slice/settings/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {
    const dispatch = useDispatch()
    const settings = useSelector((store) => store.settingsReducer.value);

    const handleRatingUpdate = (e) => {
        e.preventDefault()
        dispatch(setSettings(parseInt(e.target.value, 10)))
    }

    const handleReset = () => {
        dispatch(resetSettings())
    }

    return (
        <div className="settings__main">
            <h1>Settings</h1>
            <label>
                Selecciona el rating
                <input className="" min={0} max={100} value={settings} type="range" onChange={handleRatingUpdate} name="max" />
            </label>
            {settings}

            <button onClick={handleReset}>Resetear</button>
        </div>
    );
};

export default Settings;
