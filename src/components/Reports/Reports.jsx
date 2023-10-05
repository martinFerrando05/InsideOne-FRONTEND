import React, { useEffect, useState } from 'react';
//styles
import './Reports.scss';
//components
import Table from './Tables/Table';
import SingleView from '../../commons/SingleView/SingleView';
import Filters from './filters/Filters';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setPaginatedData } from '../../store/slice/firestore/firestoreSlice';

const Reports = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const dispatch = useDispatch();
  const { data, currentPage, itemsPerPage, filter } = useSelector((store) => store.firestoreReducer);
  const totalPages = Math.ceil(filter ? filter?.length / itemsPerPage : data?.length / itemsPerPage);

    const handleOpenModal = (report) => {
        setSelectedReport(report);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
        setModalIsOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedData = filter ? filter?.slice(startIndex, endIndex) : data?.slice(startIndex, endIndex);
                dispatch(setPaginatedData(paginatedData));
            } catch (error) {
                console.error('Error al traer la data:', error);
            }
        };

        fetchData();
    }, [currentPage, data, itemsPerPage, filter]);

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const handleNextClick = () => {

        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        <div className="container-reports">
            <Filters />
            <Table openModal={handleOpenModal} />
            {modalIsOpen && <SingleView isOpen={modalIsOpen} onClose={handleCloseModal} selectedReport={selectedReport} />}
            <div className="buttons__main">
                <button onClick={handlePreviousClick} disabled={currentPage === 1} className={currentPage === 1 ? 'disabled-button' : ''}>
                    ANTERIOR
                </button>
                <p style={{ color: 'black' }}>{currentPage}</p>
                <button onClick={handleNextClick} disabled={currentPage === totalPages} className={currentPage === totalPages ? 'disabled-button' : ''}>
                    SIGUIENTE
                </button>
            </div>
        </div>
    );
};

export default Reports;
