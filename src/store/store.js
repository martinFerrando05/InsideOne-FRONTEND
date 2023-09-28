import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user";
import { firestoreSlice } from "./slice/firestore/firestoreSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    firestoreReducer: firestoreSlice.reducer
  },
});
