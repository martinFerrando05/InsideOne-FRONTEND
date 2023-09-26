//styles
import './scss/filterDate.scss'
//datePicker
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);
setDefaultLocale('es');

import calendar from '../../../assets/icons/calendar.svg';

const FiltersDate = ({ filters, setFilters }) => {
  //date
  const handleStartDateChange = (newDate) => {
      setFilters({ ...filters, date: { ...filters.date, start: newDate } });
  };

  const handleEndDateChange = (newDate) => {
      setFilters({ ...filters, date: { ...filters.date, end: newDate } });
  };
  return (
      <div className="filterDate__main">
          <div className="container">
              <DatePicker
                  className="calendar"
                  selected={filters.date.start}
                  onSelect={() => new Date()} //when day is clicked
                  onChange={handleStartDateChange} //only when value has changed
                  locale="es"
                  dateFormat="dd/MM/yyyy"
              />
              <img src={calendar} alt="" />
          </div>

          <div className='container'>
              <DatePicker
                  className="calendar"
                  selected={filters.date.end}
                  onSelect={() => new Date()} //when day is clicked
                  onChange={handleEndDateChange} //only when value has changed
                  locale="es"
                  dateFormat="dd/MM/yyyy"
              />
              <img src={calendar} alt="" />
          </div>
      </div>
  );
};


export default FiltersDate;