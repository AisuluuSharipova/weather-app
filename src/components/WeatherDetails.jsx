import React from 'react';

const WeatherDetails = ({ weather }) => {
  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].main}</p>
    </div>
  );
};

export default WeatherDetails;
