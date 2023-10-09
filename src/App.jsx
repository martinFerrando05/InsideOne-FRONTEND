//estails
import './App.scss';
//riat
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
//firestore
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './config/firebase';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setData, setLatestDocId } from './store/slice/firestore/firestoreSlice';
//components
import Sidebar from './components/Sidebar/Sidebar';
import EmotionAnalysis from './components/Example/EmotionAnalysis';
import Reports from './components/Reports/Reports';
import Metrics from './components/Metrics/Metrics';
import Page404 from './components/Page404/Page404';
import emailjs from 'emailjs-com';
//toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//utils
import { dateFormater } from './utils/dateFormater';
import Settings from './components/Settings/Settings';
import Home from './components/Home/Home';
const SERVICE_ID = import.meta.env.VITE_APP_SERVICEKEY;
const TEMPLATE_ID = import.meta.env.VITE_APP_TEMPLATEID;
const EMAIL_ID = import.meta.env.VITE_APP_EMAILKEY;

function App() {
    const dispatch = useDispatch();
    const settings = useSelector((store) => store.settingsReducer.value);
    const location = useLocation();

    const fetchCompleteData = () => {
        const queryRef = query(collection(db, 'respuestas-reportes'), orderBy('date', 'desc'));
        const unsub = onSnapshot(queryRef, (snapshot) => {
            const docs = snapshot.docs.map((doc) => {
                const timestamp = doc.data().date;
                const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toString();
                return {
                    ...doc.data(),
                    id: doc.id,
                    date,
                    dateFormated: dateFormater(new Date(date)),
                };
            });

            dispatch(setData(docs));

            // const newLatestDocId = snapshot.docs.length > 0 ? snapshot.docs[0].id : null;
            // if (newLatestDocId) {
            //     const lastDocRef = doc(db, 'respuestas-reportes', newLatestDocId);
            //     getDoc(lastDocRef)
            //         .then((doc) => {
            //             if (doc.exists()) {
            //                 const lastDocData = doc.data();

            //                 if (lastDocData.client.rating <= settings) {
            //                     const templateParams = {
            //                         to_email: 'isidromolina268@gmail.com',
            //                         message: `Nuevo documento con rating ${lastDocData.client.rating} agregado. Tu ajuste: ${settings}`,
            //                     };
            //                     emailjs
            //                         .send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAIL_ID)
            //                         .then((response) => {
            //                             //alert(Nuevo doc con indice menor a ${settings} agregado)
            //                             console.log('Email sent successfully:', response);
            //                         })
            //                         .catch((error) => {
            //                             console.error('Email failed to send:', error);
            //                         });
            //                 }
            //             }
            //         })
            //         .catch((error) => {
            //             console.error('Error al traer el ultimo doc', error);
            //         });
            //     dispatch(setLatestDocId(newLatestDocId));
            // }
        });

        return () => {
            unsub();
        };
    };

    useEffect(() => {
        fetchCompleteData();
    }, []);

    return (
        <main className="app__main">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            {location.pathname !== '/404' && <Sidebar />}
            <Routes>
                <Route path="/" element={<Metrics />} />
                <Route path="/agents" element={<Reports />} />
                <Route path="/conversations" element={<Reports />} />
                <Route path="/metrics" element={<Metrics />} />
                <Route path="/emotions" element={<EmotionAnalysis />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="404" element={<Page404 />} />
                <Route path="*" element={<Navigate to="404" />} />
            </Routes>
        </main>
    );
}

export default App;
