//MESSI THUNK ⭐⭐⭐
//firestore
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../config/firebase";
//axios
import axios from "axios";
//actions
import { setLoadingAnalysis, setLoadingConversation, setSingleEmotionAnalisys } from './demoEmotionAnalysisSlice';
import { setCoversation } from "./demoEmotionAnalysisSlice";
//URLs
const URL_GET_EMOTION_ANALYSIS ='http://localhost:5000/prueba-97c35/us-central1/getEmotionsAnalysis'
const URL_CHATBOT = 'http://localhost:5000/prueba-97c35/us-central1/chatAssistantBotGalicia'

export function thunkDemoEmotionAnalysis(messageToSend , type = 'chatbot' , reset = false ) {

  const typesFunctions = {
    emotionAnalysis : URL_GET_EMOTION_ANALYSIS,
    chatbot: URL_CHATBOT
  }

  if(type !== 'chatbot' ){
    console.log(messageToSend);
  }
  return async (dispatch) => {
    dispatch(setLoadingConversation(true))
    dispatch(setLoadingAnalysis(true))
    try {
      const response = await axios.post(
        typesFunctions[type] ,
        { text: messageToSend  , reset}
      );
      const { data } = response;
      

      
      if(type === 'chatbot'){
        dispatch(setCoversation({role: 'assistant' , content: data }))
      }else{
        dispatch(setSingleEmotionAnalisys(data))
      }
      // const queryRef = collection(db, "respuestas-reportes");
      // addDoc(queryRef, {
      //   ...data,
      //   question: input,
      //   date: Timestamp.fromDate(new Date()),
      // });
    } catch (error) {
      console.error(error);
    }
   
  };
}
