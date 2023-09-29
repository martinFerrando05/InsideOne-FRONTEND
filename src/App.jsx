// estail
import "./App.scss";
// riat
import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router";
//firestore
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
//redux
import { useDispatch } from 'react-redux';
import { setData } from './store/slice/firestore/firestoreSlice';
//components
import Sidebar from "./components/Sidebar/Sidebar";
import { dateFormater } from "./utils/dateFormater";
import EmotionAnalysis from "./components/Example/EmotionAnalysis";
import Reports from "./components/Reports/Reports";
import Metrics from "./components/Metrics/Metrics";

function App() {
  const dispatch = useDispatch();
  const isFirstLoadRef = useRef(true);

    useEffect(() => {     
        const queryRef = collection(db, 'respuestas-reportes');
        const unsub = onSnapshot(queryRef, (snapshot) => {
            const docs = snapshot.docs.map((doc) => {
              const timestamp = doc.data().date
              const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toString()
              
                return {
                    ...doc.data(),
                    id: doc.id,  
                    date,
                    dateFormated: dateFormater(new Date(date))
                };
            });

            
          dispatch(setData(docs))

      snapshot.docChanges().forEach((change) => {
        if (!isFirstLoadRef.current) {
          if (change.type === "added") {
            const newDoc = change.doc.data();
           
            if (newDoc.client.satisfaction_index === "Bajo") {
              // alert('Documento nuevo con indice bajo');
              console.log("DOCUMENTO NUEVO CON INDICE BAJO");
            }
          }
        }
      });
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
        <Route path="/answers" element={<Reports />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/emotions" element={<EmotionAnalysis />} /> 
      </Routes>
    </main>
  );
}

export default App;
