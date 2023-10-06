import { createSlice } from "@reduxjs/toolkit";
import { specificAgentData } from "../../../utils/AgentsScreen/agents";

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
    filter: null,
    agentsState: null
  },
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
      state.agentsState = specificAgentData(payload)
      localStorage.setItem("data", JSON.stringify(payload));
    },
    setPaginatedData: (state, { payload }) => {
      state.paginatedData = payload;
      localStorage.setItem("paginatedData", JSON.stringify(payload));
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
    setFilter: (state, { payload }) => {
      state.currentPage = 1;
      state.filter = payload;
    },
  },
});

export const {
  setData,
  setPaginatedData,
  setCurrentPage,
  setLatestDocId,
  setFirstDocId,
  setLastDocId,
  setFilter,
} = firestoreSlice.actions;
