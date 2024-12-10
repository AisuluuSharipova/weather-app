import React, { useState } from 'react';
import axios from 'axios';
import WeatherSearch from './components/WeatherSearch';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setError(null);
    setWeather(null);
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <WeatherSearch onSearch={fetchWeather} />
      {error && <p>{error}</p>}
      {weather && <WeatherDetails weather={weather} />}
    </div>
  );
};

export default App;
