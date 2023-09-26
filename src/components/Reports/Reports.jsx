import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../store/slice/firestore/firestoreSlice";
import { db } from "../../config/firebase";
import Table from "./Tables/Table";
import SingleView from '../../commons/SingleView'

const Reports = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
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


 return (
    <div>
     <Table openModal={handleOpenModal} />
      {modalIsOpen && (
        <SingleView isOpen={modalIsOpen} onClose={handleCloseModal} selectedReport={selectedReport} />
      )}
    </div>
  );
};

export default Reports;
