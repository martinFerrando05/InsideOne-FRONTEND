import React, { useState } from 'react';
//styles
import './scss/filters.scss';
import 'react-datepicker/dist/react-datepicker.css';
//components
import FiltersDate from './FiltersDate';
import FilterRating from './FilterRating';
import FiltersSelects from './FiltersSelects';
import FilterButtons from './FilterButtons';

const filtersInitialValues = {
    date: { start: new Date(), end: new Date() },
    rating: '',
    emotion: 'Emotiones',
    indexSatisfaction: 'Índice de satisfacción',
};

const Filters = () => {
    const [filters, setFilters] = useState(filtersInitialValues);
    //rating
    return (
        <div className="filters__main">
            <FiltersDate filters={filters} setFilters={setFilters} />
            <FilterRating filters={filters} setFilters={setFilters} />
            <FiltersSelects filters={filters} setFilters={setFilters} />
            <FilterButtons filtersInitialValues={filtersInitialValues} filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default Filters;
