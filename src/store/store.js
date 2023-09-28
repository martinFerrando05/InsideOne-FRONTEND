import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user";
import { firestoreSlice } from "./slice/firestore/firestoreSlice";
import { filtersSlice } from "./slice/filtersSlice/filtersSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    firestoreReducer: firestoreSlice.reducer,
    filtersReducer: filtersSlice.reducer
  },
});
