import React, { useState } from "react";
//styles
import "./Reports.scss"
//components
import Table from "./Tables/Table";
import SingleView from "../../commons/SingleView/SingleView";
import Filters from "./filters/Filters";


const Reports = () => {
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

   return (
      <div className="container-reports">
        <Filters />
        <Table openModal={handleOpenModal} />
        {modalIsOpen && (
          <SingleView
            isOpen={modalIsOpen}
            onClose={handleCloseModal}
            selectedReport={selectedReport}
          />
        )}
      </div>
  );
};

export default Reports;
