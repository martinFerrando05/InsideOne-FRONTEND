import { Routes, Route } from "react-router";
import "./App.scss";
// riat
import React, { useEffect } from 'react';
import EmotionAnalysis from "./components/Example/EmotionAnalysis";
import Reports from "./components/Reports/Reports";
import Metrics from "./components/Metrics/Metrics";
//firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./config/firebase";
//redux
import { useDispatch } from 'react-redux';
import { setData } from "./store/slice/firestore/firestoreSlice";


function App() {
  const dispatch = useDispatch();
      useEffect(() => {
          const queryRef = collection(db, 'respuestas-reportes');
          getDocs(queryRef).then((res) => {
              const data = res.docs;
              const docs = data.map((doc) => {
                  return {
                      ...doc.data(),
                  };
              });
              dispatch(setData(docs));
          });
      }, []);

  return (
    <main className="app__main">
      <Routes>
      <Route path="/answers" element={<Reports/>}/>
      <Route path="/reports" element={<Reports/>}/>
      <Route path="/metrics" element={<Metrics />}/>
      {/*     <EmotionAnalysis /> */}
      </Routes>
    </main>
  );
}

export default App;
