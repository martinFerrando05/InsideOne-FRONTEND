import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../store/slice/firestore/firestoreSlice";
import { db } from "../../config/firebase";
import SingleView from '../../commons/SingleView'


const Reports = () => {
  const dispatch = useDispatch();
  const firestore = useSelector((store) => store.firestoreReducer);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => {
    setSelectedReport(report);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const queryRef = collection(db, "pruebas-p5");
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

  console.log(firestore);

 return (
    <div>
      {/* <div>
          <button onClick={() => openModal()}>Modal</button>
      </div> */}
      {modalIsOpen && (
        <SingleView isOpen={modalIsOpen} onClose={closeModal} selectedReport={firestore.data[6]} />
      )}
    </div>
  );
};

export default Reports;
