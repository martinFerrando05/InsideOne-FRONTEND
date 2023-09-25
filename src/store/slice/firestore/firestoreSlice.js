import { createSlice } from '@reduxjs/toolkit';

export const firestoreSlice = createSlice({
    name: 'firestore',

    initialState: {
        data: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setData } = firestoreSlice.actions;