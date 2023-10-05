import React, { useState, useRef } from "react";

//styles
import "./scss/filters.scss";
import "react-datepicker/dist/react-datepicker.css";
//components
import FiltersDate from "./FiltersDate";
import FilterRating from "./FilterRating";
import FiltersSelects from "./FiltersSelects";
import FilterButtons from "./FilterButtons";
import FilterInputsResoponse from "./FilterInputsResoponse";
//icons
import filterIcon from "../../../assets/icons/filter.svg";
import cross from "../../../assets/icons/cross.svg";
//utils
import { dateFormater } from "../../../utils/dateFormater";
const filtersInitialValues = {
  date: { start:null, end: null },
  rating: {
    min: 0,
    max: 100,
  },
  emotion: [],
  indexSatisfaction: "index",
  phoneNumber: "",
  agent: "",
  dni: "",
};

const Filters = () => {
  const [filters, setFilters] = useState(filtersInitialValues);
  const [showFilter, setShowFilter] = useState(false);
  const [showEmotions, setShowEmotions] = useState(false);

  const handleRemoveEmotions = (emotionToRemove) => {
    const newEmotionsList = filters.emotion.filter(
      (emotion) => emotion !== emotionToRemove
    );

    setFilters({ ...filters, emotion: newEmotionsList });
  };


  const displayDescription =(someFilter)=>{
    return someFilter.length >= 1 ? {opacity : 1} : {opacity : 0}
 }

  const classesIndexSatisfaction = {
    alto: 'high',
    medio: 'medium',
    bajo: 'low',
    index: ''
  }
  
  let conditionsDates 
  
    if(filters.date.start && filters.date.end) {
      conditionsDates = 'hasBothDates'
    }
    else if (filters.date.start && !filters.date.end){
      conditionsDates = 'hasOnlyStartDate'
    }else{
      conditionsDates = 'hasNotDates'
    }
 

  const showText = {
    hasBothDates:  <>
    <p>Desde: {filters.date.start &&  dateFormater(filters.date.start, false)} </p>
    <p>Hasta: {filters.date.end && dateFormater(filters.date.end, false)}</p>
   </> ,
    hasOnlyStartDate:
    <p>De la fecha: {filters.date.start &&  dateFormater(filters.date.start, false)} </p>
 ,
    hasNotDates: 
    <p>Todas las fechas</p>
  }
  return (
    <section 
    onClick={()=>setShowEmotions(false)}
    className="filters__main">
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="filters__cont_icon"
      >
        <img src={filterIcon} />
      </div>

      <div className="filters__descriptions">
        <div className="filters__container">
          <li className="filters__container_li">
            <h5>Fecha:</h5>

            {
              showText[conditionsDates]
            }
          </li>
          <li className="filters__container_li">
            <h5>Rating: </h5>
            <p>Desde: {filters.rating.min}%</p>
            <p>Hasta: {filters.rating.max}%</p>
          </li>
          <div className="filters__cont_emotions">
            <h5>Emociones: </h5>
            <ul className="filters__cont_emotions_ul">
              {filters.emotion?.map((emotion, i) => (
                <li key={i} className="filters__cont_emotions_li">
                  <img
                    onClick={() => handleRemoveEmotions(emotion)}
                    src={cross}
                    alt="cross icon"
                  />
                  <p>{emotion}</p>
                </li>
              ))}
            </ul>
          </div>
          <li className="filters__container_li">
              <h5>Índice de satisfacción:</h5>
            <p className={'filters__index_satisfaction_'+classesIndexSatisfaction[filters.indexSatisfaction.toLowerCase()]}>
              
              {filters.indexSatisfaction == "index"
                ? "No seleccionado"
                : filters.indexSatisfaction}
            </p>
          </li>
        </div>

        <ul className="filters__container_inputs">
          <li style={displayDescription(filters.phoneNumber)}>
            <h5>Teléfono: </h5>
            <p>{filters.phoneNumber}</p>
          </li>
          <li style={displayDescription(filters.dni)}>
            <h5>DNI: </h5>
            <p>{filters.dni}</p>
          </li>
          <li style={displayDescription(filters.agent)}>
            <h5>Agente: </h5>
            <p>{filters.agent}</p>
          </li>
          <FilterButtons
            filtersInitialValues={filtersInitialValues}
            filters={filters}
            setFilters={setFilters}
            setShowFilter={setShowFilter}
          />
        </ul>
      </div>

      <span
        style={showFilter ? { display: "flex" } : { display: "none" }}
        className="filters__dropdown"
      >
        <h4>¿Cómo querés filtrar?</h4>

        <section className="filters__dropdown_section">
          <div className="filters__dropdown_cont first">
            <FiltersDate filters={filters} setFilters={setFilters} />
            <FilterRating filters={filters} setFilters={setFilters} />
          </div>
          <div className="filters__dropdown_cont second">
            <FiltersSelects setShowEmotions={setShowEmotions} showEmotions={showEmotions} filters={filters} setFilters={setFilters} />
            <FilterInputsResoponse filters={filters} setFilters={setFilters} />
          </div>
        </section>
      </span>
    </section>
  );
};

export default Filters;
