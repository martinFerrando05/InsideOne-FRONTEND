import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
    name: 'settings',

    initialState: {
        value: parseInt(localStorage.getItem('settings')) || 39
    },
    reducers: {
        setSettings: (state, action) => {
            state.value = action.payload
            localStorage.setItem('settings', action.payload)
        },
        resetSettings: (state) => {
            state.value = 39
            localStorage.removeItem('settings')
        }
    }
})

export const {setSettings, resetSettings} = settingsSlice.actions