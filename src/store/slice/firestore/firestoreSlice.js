import { createSlice } from '@reduxjs/toolkit';


export const firestoreSlice = createSlice({
    name: 'firestore',

    initialState: {
        data: null,
    },
    reducers: {
        setData: (state, { payload }) => {
            state.data = payload;
            localStorage.setItem('data', JSON.stringify( payload ))
        },
    },
});

// Action creators are generated for each case reducer function
export const { setData } = firestoreSlice.actions;