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
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      setWeather(weatherResponse.data);
      fetchForecast(city);
    } catch (err) {
      setError('Invalid city name');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      setForecast(forecastResponse.data.list);
    } catch (err) {
      setError('Unable to fetch forecast');
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((item) => item !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) setFavorites(savedFavorites);
  }, []);

  const geolocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );

        setWeather(response.data);
        fetchForecast(response.data.name);
      });
    } else {
      setError('Geolocation not supported');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
{     
      <div className="search-section">
      <WeatherSearch onSearch={fetchWeather} geolocationWeather={geolocationWeather} />
    </div>    
       }
      {loading && <LoadingSpinner />}
  
      {error && <p>{error}</p>}
  
      {weather && (
        <>
          <WeatherDetails weather={weather} />
          <button onClick={() => addFavorite(weather.name)}>Add to Favorites</button>
        </>
      )}
  
      {forecast && <ForecastChart forecastData={forecast} />}
  
      <h2>Favorites</h2>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <span>{city}</span>
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => fetchWeather(city)}
            >
              View Weather
            </button>
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => removeFavorite(city)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
