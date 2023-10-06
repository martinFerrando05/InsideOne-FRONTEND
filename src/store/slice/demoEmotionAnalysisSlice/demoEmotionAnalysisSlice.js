import { createSlice } from "@reduxjs/toolkit";

export const demoEmotionAnalysisSlice = createSlice({
  name: "demoEmotionAnalisys",

  initialState: {
    singleEmotionAnalysis: null,
    allSingleAnalysis: [],
    conversation: null,
    allConversationAnalyis: null,
    mode: 'singleMessage',
    loadingConversation: false,
    loadingAnalysis: false
  },
  reducers: {
    setCoversation: (state, { payload }) => {
      
      state.conversation = payload?.conversationChatBot.slice(1)
      state.loadingConversation = false
    },
    setSingleEmotionAnalisys: (state, { payload }) => {
      state.singleEmotionAnalysis = payload;
      state.loadingAnalysis = false
    },
    setMode :(state, { payload})=>{
      state.mode = payload
    },
    setLoadingConversation : (state, { payload})=>{
      state.loadingConversation = payload
    }

    ,setLoadingAnalysis: (state, { payload})=>{
      state.loadingAnalysis = payload
    }

    
  },
});

// Action creators are generated for each case reducer function
export const { setSingleEmotionAnalisys  , setCoversation ,setMode , setLoadingConversation ,setLoadingAnalysis} = demoEmotionAnalysisSlice.actions