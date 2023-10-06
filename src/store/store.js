import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user";
import { firestoreSlice } from "./slice/firestore/firestoreSlice";
import { settingsSlice } from "./slice/settings/settingsSlice";
import { demoEmotionAnalysisSlice } from "./slice/demoEmotionAnalysisSlice/demoEmotionAnalysisSlice";
export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    firestoreReducer: firestoreSlice.reducer,
    settingsReducer: settingsSlice.reducer,
    demoEmotionAnalysisReducer: demoEmotionAnalysisSlice.reducer
  },
});
