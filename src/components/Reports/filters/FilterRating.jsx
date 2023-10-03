import { useState } from "react";
import "./scss/filterRating.scss";

const FilterRating = ({ filters, setFilters }) => {

  const handleChange = (event) => {
    event.stopPropagation();
    const name = event.target.name;
    const value = parseInt(event.target.value);
    if (name === "min" && value > filters.rating.max) {
      return;
    }
    if (name === "max" && value < filters.rating.min) {
      return;
    }
    else{
      console.log(name);
      setFilters({ ...filters, rating:{...filters.rating, [name]:value } });
    }
  };

  return (
    <section 
      className="filterRating__main">
        <h4>Rating</h4>
      <div
        className="filterRating__cont_inputs">
        <label htmlFor="filter__input_min_range"><p>Min: {filters.rating.min}%</p></label>
        <input
          id="filter__input_min_range"
          className='filterRating__input'
          min={0}
          max={100}
          onChange={handleChange}
          value={filters.rating.min}
          type="range"
          name="min"
        />
        <label htmlFor="filter__input_min_range"> <p>Max: {filters.rating.max}%</p></label>
        <input
          className='filterRating__input'
          min={0}
          max={100}
          onChange={handleChange}
          value={filters.rating.max}
          type="range"
          name="max"
        />
      </div>
    </section>
  );
};

export default FilterRating;
