import React, { useState } from 'react';
//router
import { useLocation } from 'react-router';
//styles
import './scss/filters.scss';
import 'react-datepicker/dist/react-datepicker.css';
//components
import FiltersDate from './FiltersDate';
import FilterRating from './FilterRating';
import FiltersSelects from './FiltersSelects';
import FilterButtons from './FilterButtons';
import FilterInputsResoponse from './FilterInputsResoponse'

const filtersInitialValues = {
    date: { start: new Date(), end: new Date() },
    rating: '',
    emotion: 'emotions',
    indexSatisfaction: 'index',
    phoneNumber: '',
    agent:'',
    dni:''
  };

const Filters = () => {
  const [filters, setFilters] = useState(filtersInitialValues);
  const location = useLocation();
  const isReports = location.pathname === '/reports'

  return (
      <div className="filters__main">
          <FiltersDate filters={filters} setFilters={setFilters} />
          {isReports ? 
          
          <>
            <FilterRating filters={filters} setFilters={setFilters} />
            <FiltersSelects filters={filters} setFilters={setFilters} />
          </>
          :
            <FilterInputsResoponse filters={filters} setFilters={setFilters} />
          }
          <FilterButtons filtersInitialValues={filtersInitialValues} filters={filters} setFilters={setFilters} />
      </div>
  );
};



export default Filters;
