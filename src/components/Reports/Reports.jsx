import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../store/slice/firestore/firestoreSlice";
import { db } from "../../config/firebase";
import Table from "./Tables/Table";

const Reports = () => {
  const dispatch = useDispatch();
  const firestore = useSelector((store) => store.firestoreReducer);

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

  return <div>
    <Table items={firestore.data}/>
  </div>;
};

export default Reports;
