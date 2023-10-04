//estail
import "./App.scss";
//riat
import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router";
//firestore
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./store/slice/firestore/firestoreSlice";
//components
import Sidebar from "./components/Sidebar/Sidebar";
import EmotionAnalysis from "./components/Example/EmotionAnalysis";
import Reports from "./components/Reports/Reports";
import Metrics from "./components/Metrics/Metrics";
import Page404 from "./components/Page404";
import emailjs from "emailjs-com";

//utils
import { dateFormater } from "./utils/dateFormater";
import Settings from "./components/Settings/Settings";
const SERVICE_ID = import.meta.env.VITE_APP_SERVICEKEY;
const TEMPLATE_ID = import.meta.env.VITE_APP_TEMPLATEID;
const EMAIL_ID = import.meta.env.VITE_APP_EMAILKEY;

function App() {
  const dispatch = useDispatch();
  const isFirstLoadRef = useRef(true);
  const settings = useSelector((store) => store.settingsReducer.value);

  useEffect(() => {
    const queryRef = collection(db, "respuestas-reportes");
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const timestamp = doc.data().date;
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        ).toString();
        return {
          ...doc.data(),
          id: doc.id,
          date,
          dateFormated: dateFormater(new Date(date)),
        };
      });

      dispatch(setData(docs));

      snapshot.docChanges().forEach((change) => {
        // if (!isFirstLoadRef.current) {
        //   if (change.type === "added") {
        //     const newDoc = change.doc.data();

        //     if (newDoc.client.rating <= settings) {
        //       // Email sending logic
        //       const templateParams = {
        //         to_email: "isidromolina268@gmail.com", // Recipient email address
        //         message: `New document with rating ${newDoc.client.rating} added. Threshold: ${settings}`,
        //       };

        //       emailjs
        //         .send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAIL_ID)
        //         .then((response) => {
        //           //alert(Nuevo doc con indice menor a ${settings} agregado)
        //           console.log("Email sent successfully:", response);
        //         })
        //         .catch((error) => {
        //           console.error("Email failed to send:", error);
        //         });

        //       console.log(
        //         `New doc with rating ${newDoc.client.rating} added. Threshold: ${settings}`
        //       );
        //     }
        //   }
        // }
        // console.log(change);
      })
      isFirstLoadRef.current = false;
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <main className="app__main">
      <Sidebar />
      <Routes>
        <Route path="/agents" element={<Reports />} />
        <Route path="/conversations" element={<Reports />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/emotions" element={<EmotionAnalysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </main>
  );
}

export default App;
