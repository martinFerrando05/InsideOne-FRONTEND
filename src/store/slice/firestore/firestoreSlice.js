import { createSlice } from "@reduxjs/toolkit";

export const firestoreSlice = createSlice({
  name: "firestore",

  initialState: {
    data: null,
    lastAdded: null,
  },
  reducers: {
    setData: (state, { payload }) => {
      payload.sort((a, b) => {
        const fechaA = new Date(a.date);
        const fechaB = new Date(b.date);
        return fechaB - fechaA;
      });

      state.data = payload;
      state.lastAdded = payload[0];

     
      localStorage.setItem("data", JSON.stringify(payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData } = firestoreSlice.actions;
