//MESSI THUNK ⭐⭐⭐
import { store } from "../../store";

//firestore
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
//axios
import axios from "axios";
//actions
import {
  setLoadingAnalysis,
  setLoadingConversation,
  setSingleEmotionAnalisys,
} from "./demoEmotionAnalysisSlice";
import { setCoversation, setIdConversation } from "./demoEmotionAnalysisSlice";
//URLs
const URL_GET_EMOTION_ANALYSIS =
  "http://localhost:5000/prueba-97c35/us-central1/getEmotionsAnalysis";
const URL_CHATBOT =
  "http://localhost:5000/prueba-97c35/us-central1/chatAssistantBotGalicia";
// email
import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_APP_SERVICEKEY;
const TEMPLATE_ID = import.meta.env.VITE_APP_TEMPLATEID;
const EMAIL_ID = import.meta.env.VITE_APP_EMAILKEY;

// toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function thunkDemoEmotionAnalysis(
  messageToSend,
  conversation,
  settings,
  idConversation,
  analyzeAllConversation = false
) {
  let conversationForChatbot = conversation.map((conv) => {
    return { role: conv.role, content: conv.content };
  });

  const endpoints = [
    { url: URL_GET_EMOTION_ANALYSIS, send: messageToSend },
    { url: URL_CHATBOT, send: conversationForChatbot },
  ];

  if (analyzeAllConversation) {
    endpoints.pop();
  }

  return async (dispatch) => {
    dispatch(setLoadingConversation(true));
    dispatch(setLoadingAnalysis(true));

    try {
      const [responseAnalysis, responseChatbot] = await axios.all(
        endpoints.map((endpoint) =>
          axios.post(endpoint.url, { text: endpoint.send }).then((data) => data)
        )
      );

      const rating = responseAnalysis.data.client.rating;
      const emotions = responseAnalysis.data.client.emotions;
      const keywords = responseAnalysis.data.client.keywords;
      const satisfaction_index =
        responseAnalysis.data.client.satisfaction_index;
      const summary = responseAnalysis.data.client.summary;
      if (!analyzeAllConversation) {
        dispatch(
          setCoversation({
            role: "assistant",
            content: responseChatbot.data,
            rating: rating,
            emotions,
            keywords,
          })
        );
      }
      dispatch(setSingleEmotionAnalisys(responseAnalysis.data));

      let dbConversation;
      if (!analyzeAllConversation) {
        dbConversation = [...conversation];

        let lastElement = dbConversation.pop();
        lastElement.rating = rating;
        lastElement.emotions = emotions;
        lastElement.keywords = keywords;
        dbConversation.push(lastElement);

        dbConversation.push({
          role: "assistant",
          content: responseChatbot.data,
        });
      } else {
        dbConversation = {
          "client.rating": rating,
          "client.keywords": keywords,
          "client.emotions": emotions,
          "client.summary": summary,
          "client.satisfaction_index": satisfaction_index,
        };
      }

      let test = responseAnalysis.data.client;
      let queryRef = collection(db, "isi");

      if (!idConversation) {
        addDoc(queryRef, {
          ...responseAnalysis.data,
          conversation: dbConversation,
          date: Timestamp.fromDate(new Date()),
        })
          .then((res) => dispatch(setIdConversation(res.id)))
          .catch((err) => console.error(err));
      } else {
        console.log(idConversation);
        queryRef = doc(db, "isi", idConversation);

        updateDoc(
          queryRef,
          analyzeAllConversation
            ? dbConversation
            : { conversation: dbConversation }
        );
      }

      for (const key in test) {
        if (test[key] === null || test[key] === "") {
          console.log("Datos no validos");
          return;
        }
      }

      if (rating) {
        if (rating <= settings) {
          const templateParams = {
            to_email: "isidromolina268@gmail.com",
            message: `Nuevo documento con rating ${rating} agregado. Tu ajuste: ${settings}`,
          };
          emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAIL_ID)
            .then((response) => {
              toast.success(
                `Nuevo doc con indice menor a ${settings} agregado`
              );
              console.log("Email sent successfully:", response);
            })
            .catch((error) => {
              console.error("Email failed to send:", error);
            });
        }
      } else {
        console.log("FALLO");
      }
    } catch (error) {
      console.error(error);
    }
  };
}
