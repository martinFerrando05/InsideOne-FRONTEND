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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      setFilters({ ...filters, date: { start: start , end: end  } });
    }

    const currentDate = new Date();
  return (
    <div className="filterDate__main">

      <div className="container">
        <div className="container_calendar">

          <DatePicker
            className="calendar"
            selected={startDate}
            maxDate={currentDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
        </div>
        <div className="container_calendar_img">
          <img src={calendar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FiltersDate;
