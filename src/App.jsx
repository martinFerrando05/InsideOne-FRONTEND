// estilos
import { Routes, Route } from "react-router";
import "./App.scss";
// riat
import React, { useEffect, useRef } from 'react';
import EmotionAnalysis from './components/Example/EmotionAnalysis';
import Reports from './components/Reports/Reports';
import Metrics from './components/Metrics/Metrics';
//firestore
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
//redux
import { useDispatch } from 'react-redux';
import { setData } from './store/slice/firestore/firestoreSlice';

function App() {
  const dispatch = useDispatch();
  const isFirstLoadRef = useRef(true);

    useEffect(() => {
        const queryRef = collection(db, 'respuestas-reportes');
        const unsub = onSnapshot(queryRef, (snapshot) => {
            const docs = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
          dispatch(setData(docs))

              snapshot.docChanges().forEach((change) => {
                  if (!isFirstLoadRef.current) {
                      if (change.type === 'added') {
                          const newDoc = change.doc.data();
                          if (newDoc.indice === 'Bajo') {
                            // alert('Documento nuevo con indice bajo');
                            console.log('DOCUMENTO NUEVO CON INDICE BAJO');
                          }
                      }
                  }
              });
            isFirstLoadRef.current = false;
        });

        return () => {
            unsub();
        };
    }, [dispatch]);

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
