import { createSlice } from '@reduxjs/toolkit';

export const firestoreSlice = createSlice({
  name: "firestore",
  
    initialState: {
        data: null,
        paginatedData: null,
        currentPage: 1,
        itemsPerPage: 14,
        latestDocId: null,
        firstDocId: null,
        lastDocId: null,
    },
    reducers: {
        setData: (state, { payload }) => {
            state.data = payload;
            localStorage.setItem('data', JSON.stringify(payload));
        },
        setPaginatedData: (state, { payload }) => {
            state.paginatedData = payload;
            localStorage.setItem('paginatedData', JSON.stringify(payload));
        },
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload;
        },
        setLatestDocId: (state, { payload }) => {
            state.latestDocId = payload;
        },
        setFirstDocId: (state, { payload }) => {
            state.firstDocId = payload;
        },
        setLastDocId: (state, { payload }) => {
            state.lastDocId = payload;
        },
     },
});

export const { setData, setPaginatedData, setCurrentPage, setLatestDocId, setFirstDocId, setLastDocId } = firestoreSlice.actions;
