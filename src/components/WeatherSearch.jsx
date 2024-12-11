import React, { useState } from 'react';

const WeatherSearch = ({ onSearch, geolocationWeather }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim() !== '') {
      onSearch(city);
      setCity(''); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="search-section">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
        className="search-input"
      />
      <button className="search-button" onClick={handleSubmit}>
        Search
      </button>
      <button className="geolocation-button" onClick={geolocationWeather}>
        Use Current Location
      </button>
    </div>
  );
};

export default WeatherSearch;
