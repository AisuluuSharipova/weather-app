import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSearch from './components/WeatherSearch';
import WeatherDetails from './components/WeatherDetails';
import LoadingSpinner from './components/LoadingSpinner';
import ForecastChart from './components/ForecastChart';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [forecast, setForecast] = useState(null); 

  const fetchWeather = async (city) => {
    setError(null);
    setWeather(null);
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      fetchForecast(city); 
    } catch (err) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) setFavorites(savedFavorites);
  }, []);
  
  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          setWeather(response.data);
          fetchForecast(response.data.name); 
        } catch (err) {
          setError('Unable to fetch weather for your location');
        }
      });
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const fetchForecast = async (city) => {
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setForecast(response.data.list);
    } catch (err) {
      setError('Unable to fetch forecast');
    }
  };
  
  return (
    <div className="app">
      <h1>Weather App</h1>
      <WeatherSearch onSearch={fetchWeather} />
      <button onClick={fetchWeatherByLocation}>Get Weather for My Location</button>
      {loading && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {weather && (
        <>
          <WeatherDetails weather={weather} />
          <button onClick={() => addFavorite(weather.name)}>Add to Favorites</button>
        </>
      )}
      <h2>Favorites</h2>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <button onClick={() => fetchWeather(city)}>{city}</button>
          </li>
        ))}
      </ul>
      {forecast && <ForecastChart forecastData={forecast} />} {/* Отображаем прогноз */}
    </div>
  );
};

export default App;
