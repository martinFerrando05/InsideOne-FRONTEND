//styles
import './scss/filterButtons.scss'
const FilterButtons = ({ filters, setFilters, filtersInitialValues }) => {
  //clear
  const handleCleanFilter = () => {
      setFilters(filtersInitialValues);
  };

  return (
      <div className="filterButtons__main">
          <button onClick={() => console.log(filters)} className="filterButtons__buttons">
              Filtrar
          </button>
          <button onClick={handleCleanFilter} className="filterButtons__buttons clear">
              Limpiar
          </button>
      </div>
  );
};


export default FilterButtons;