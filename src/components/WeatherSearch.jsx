import React, { useState } from 'react';

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim() !== '') {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button onClick={handleSubmit} className="search-button">
        Search
      </button>
    </div>
  );
};

export default WeatherSearch;
