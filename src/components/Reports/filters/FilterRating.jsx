import './scss/filterRating.scss'

const FilterRating = ({ filters, setFilters }) => {
  const handleRatingChange = (event) => {
      const value = event.target.value;
      setFilters({ ...filters, rating: value });
  };

  const ratingValues = [];
  for (let i = 0; i <= 100; i += 10) {
      ratingValues.push(i);
  }

  return (
      <div className='filterRating__main'>
          <select className="filterRating__select" onChange={handleRatingChange} value={filters.rating} name="rating">
              <option value="">Rating</option>
              {ratingValues.map((optionValue) => (
                  <option key={optionValue} value={optionValue}>
                      {optionValue}
                  </option>
              ))}
          </select>
      </div>
  );
};

export default FilterRating;