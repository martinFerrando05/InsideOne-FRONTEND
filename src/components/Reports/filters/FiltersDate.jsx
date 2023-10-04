import { useState } from "react";
//styles
import "./scss/filterDate.scss";
//datePicker
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");
//icon
import calendar from "../../../assets/icons/calendar.svg";

const FiltersDate = ({ filters, setFilters }) => {
//   const handleStartDateChange = (newDate) => {
//     setFilters({ ...filters, date: { ...filters.date, start: newDate } });
//   };

//   const handleEndDateChange = (newDate) => {
//     setFilters({ ...filters, date: { ...filters.date, end: newDate } });
//   };
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }


    console.log('Start-->', startDate);
    console.log('End-->', endDate);

  const currentDate = new Date();
  return (
    <div className="filterDate__main">

      <div className="container">
        {/* <DatePicker
          className="calendar"
          selected={filters.date.end}
          onSelect={() => new Date()} //when day is clicked
          onChange={handleEndDateChange} //only when value has changed
          locale="es"
          maxDate={currentDate}
          dateFormat="dd/MM/yyyy"
          selectsRange
          startDate={filters.date.start}
          endDate={filters.date.end}
          
         
        /> */}

        <DatePicker
          selected={startDate}
          maxDate={currentDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
        <img src={calendar} alt="" />
      </div>
    </div>
  );
};

export default FiltersDate;
