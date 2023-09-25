import React, { useState } from "react";
//datePicker
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");
//styles
import "./filters.scss";
import "react-datepicker/dist/react-datepicker.css";
//utils

const emotionsArr = ["Felicidad","Tristeza","Enojo","Miedo","Sorpresa","Amor","Alegría","Preocupación","Ansiedad","Desesperación","Culpa","Vergüenza","Aburrimiento","Confusión","Gratitud","Entusiasmo","Indiferencia","Aprecio","Empatía","Orgullo","Inseguridad","Alivio","Hostilidad","Esperanza","Asombro","Incredulidad","Irritación","Soledad","Confianza","Inquietud",
];

const satisfactionIndexArr = ["Alto", "Medio", "Bajo"];

const filtersInitialValues = {
  date: { start: new Date(), end: new Date() },
  rating: "",
  emotion: "Emotiones",
  indexSatisfaction: "Índice de satisfacción",
};

const Filters = () => {
  const [filters, setFilters] = useState(filtersInitialValues);
  //rating
  return (
    <div className="filters__main">
      <FiltersDate filters={filters} setFilters={setFilters} />
      <FilterRating filters={filters} setFilters={setFilters}/>
      <FiltersSelects filters={filters} setFilters={setFilters} />
      <FilterButtons filters={filters} setFilters={setFilters} />
    </div>
  );
};

const FilterRating =( { filters, setFilters } )=>{

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, rating: value });
  };

  return (
    <div>
       <input
        type="number"
        name="rating"
        value={filters.rating}
        onChange={handleRatingChange}
      />
    </div>
  )
}

const FilterButtons = ({ filters, setFilters }) => {
  //clear
  const handleCleanFilter = () => {
    setFilters(filtersInitialValues);
  };

  return (
    <div>
      <button onClick={() => console.log(filters)} className="filter__buttons">
        Filtrar
      </button>
      <button onClick={handleCleanFilter} className="filter__buttons">
        Limpiar
      </button>
    </div>
  );
};

const FiltersSelects = ({ filters, setFilters }) => {
  //satisfactionIndex
  const handleSatisfactionIndex = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, indexSatisfaction: value });
  };
  //emotions
  const handleSelectEmotionChange = (event) => {
    const value = event === "Emociones" ? "Emociones" : event.target.value;
    setFilters({ ...filters, emotion: value });
  };

  return (
    <div>
      <select
        name="satisfaction-index"
        value={filters.indexSatisfaction}
        onChange={handleSatisfactionIndex}
      >
        <option value="">Índice de satisfacción</option>
        {satisfactionIndexArr.map((indexSatisfaction, i) => (
          <option value={indexSatisfaction.toLowerCase()} key={i}>
            {indexSatisfaction}
          </option>
        ))}
      </select>

      <select
        name="select-emotion"
        value={filters.emotion}
        onChange={handleSelectEmotionChange}
      >
        <option value="emociones">Emociones</option>
        {emotionsArr.map((emotion, i) => (
          <option key={i} value={emotion.toLowerCase()}>
            {emotion}
          </option>
        ))}
      </select>
    </div>
  );
};

const FiltersDate = ({ filters, setFilters }) => {
  //date
  const handleStartDateChange = (newDate) => {
    setFilters({ ...filters, date: { ...filters.date, start: newDate } });
  };

  const handleEndDateChange = (newDate) => {
    setFilters({ ...filters, date: { ...filters.date, end: newDate } });
  };
  return (
    <div>
      <DatePicker
        selected={filters.date.start}
        onSelect={() => new Date()} //when day is clicked
        onChange={handleStartDateChange} //only when value has changed
        locale="es"
        dateFormat="dd/MM/yyyy"
      />

      <DatePicker
        selected={filters.date.end}
        onSelect={() => new Date()} //when day is clicked
        onChange={handleEndDateChange} //only when value has changed
        locale="es"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default Filters;
