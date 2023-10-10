
//MESSI THUNK ⭐⭐⭐

//firestore
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';
//axios
import axios from 'axios';
//actions
import { setLoadingAnalysis, setLoadingConversation, setSingleEmotionAnalisys } from './demoEmotionAnalysisSlice';
import { setCoversation } from './demoEmotionAnalysisSlice';
//URLs
const URL_GET_EMOTION_ANALYSIS = 'http://localhost:5000/prueba-97c35/us-central1/getEmotionsAnalysis';
const URL_CHATBOT = 'http://localhost:5000/prueba-97c35/us-central1/chatAssistantBotGalicia';
// email
import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_APP_SERVICEKEY;
const TEMPLATE_ID = import.meta.env.VITE_APP_TEMPLATEID;
const EMAIL_ID = import.meta.env.VITE_APP_EMAILKEY;


// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function thunkDemoEmotionAnalysis(messageToSend, type = 'chatbot', reset = false, settings) {
    const typesFunctions = {
        emotionAnalysis: URL_GET_EMOTION_ANALYSIS,
        chatbot: URL_CHATBOT,
    };


    console.log(messageToSend);
  
    return async (dispatch) => {
        dispatch(setLoadingConversation(true));
        
        try {
            const response = await axios.post(typesFunctions[type], { text: messageToSend, reset });
            const { data } = response;
    
            if (type === 'chatbot') {
                dispatch(setCoversation({role: 'assistant' , content: data }));
            } else {
              let test = data.client
              dispatch(setLoadingAnalysis(true));
              dispatch(setSingleEmotionAnalisys(data));
              console.log(data);
              for (const key in test) {
                if (test[key] === null || test[key] === '') {
                  console.log('Datos no validos');
                  return
                }
              }
                const rating = data.client.rating;
                if (rating) {
                    // const queryRef = collection(db, 'respuestas-reportes');
                    // addDoc(queryRef, {
                    //     ...data,
                    //     question: messageToSend,
                    //     date: Timestamp.fromDate(new Date()),
                    // });
                    if (rating <= settings) {
                        const templateParams = {
                            to_email: 'isidromolina268@gmail.com',
                            message: `Nuevo documento con rating ${rating} agregado. Tu ajuste: ${settings}`,
                        };
                        emailjs
                            .send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAIL_ID)
                            .then((response) => {
                                toast.success(`Nuevo doc con indice menor a ${settings} agregado`);
                                console.log('Email sent successfully:', response);
                            })
                            .catch((error) => {
                                console.error('Email failed to send:', error);
                            });
                    }
                } else {
                    console.log('FALLO');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
}
