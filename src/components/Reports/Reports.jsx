import React, { useEffect, useState } from "react";
//firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../store/slice/firestore/firestoreSlice";
//components
import Table from "./Tables/Table";
import SingleView from '../../commons/SingleView';
import Filters from "./filters/Filters";
import { useLocation } from "react-router";

const Reports = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const location = useLocation();
  const isIndividualView = location.pathname === '/individual'


  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
    setModalIsOpen(false);
  };
 

  useEffect(() => {
    const queryRef = collection(db, isIndividualView ? "respuestas" : "pruebas-p5");
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
    <div>
        <Filters />
        <Table openModal={handleOpenModal} />
        {modalIsOpen && (
          <SingleView isOpen={modalIsOpen} onClose={handleCloseModal} selectedReport={selectedReport} />
        )}
    </div>
  );
};

export default Reports;
