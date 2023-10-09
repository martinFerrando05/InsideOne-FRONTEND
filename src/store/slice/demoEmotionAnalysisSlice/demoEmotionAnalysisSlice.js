import { createSlice } from "@reduxjs/toolkit";

export const demoEmotionAnalysisSlice = createSlice({
  name: "demoEmotionAnalisys",

  initialState: {
    singleEmotionAnalysis: null,
    allSingleAnalysis: [],
    conversation: [{
      role: 'system',
      content: 'Eres un asistente por chat de Galicia Seguros que brinda atención al cliente por chat para dar respuesta a preguntas sobre seguros. Podes dar información sobre tipos de seguros, hacer cotizaciones, ayudarte con trámites y responder preguntas comunes. Es como hablar con un experto en seguros en línea para obtener ayuda rápida y fácil.'
    }],
    allConversationAnalyis: null,
    mode: 'singleMessage',
    loadingConversation: false,
    loadingAnalysis: false
  },
  reducers: {
    setCoversation: (state, { payload }) => {
      state.conversation.push(payload)
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