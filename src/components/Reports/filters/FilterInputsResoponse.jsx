import React from "react";
//styles
import "./scss/filterInputsResoponse.scss";

const FilterInputsResoponse = ({
  filters,
  setFilters,
}) => {
  const handleChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="filterInputsResponse__main">
      <input
        type="number"
        className="filterInputsResoponse__input"
        placeholder="Número telefónico"
        onChange={handleChangeInputs}
        name="phoneNumber"
        value={filters?.phoneNumber}
      />
      <input
        type="number"
        className="filterInputsResoponse__input"
        placeholder="DNI"
        onChange={handleChangeInputs}
        name="dni"
        value={filters?.dni}
      />
      <input
        type="text"
        className="filterInputsResoponse__input"
        placeholder="Agente"
        onChange={handleChangeInputs}
        name="agent"
        value={filters?.agent}
      />
    </div>
  );
};

export default FilterInputsResoponse;
