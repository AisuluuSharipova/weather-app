import React, { useState, useEffect } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherDetails from './components/WeatherDetails';
import LoadingSpinner from './components/LoadingSpinner';
import ForecastChart from './components/ForecastChart';
import FavoritesList from './components/FavoritesList';
import { fetchWeatherData, fetchForecastData, fetchWeatherByCoordinates } from './api/weatherApi';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [status, setStatus] = useState('idle'); 

  const fetchWeather = async (city) => {
    setError(null);
    setWeather(null);
    setStatus('pending'); 
  
    try {
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
      await fetchForecast(city);
      setStatus('done'); 
    } catch (err) {
      setError('Invalid city name');
      setStatus('error'); 
    }
  };
  
  const fetchForecast = async (city) => {
    setError(null);

    try {
      const forecastData = await fetchForecastData(city);
      setForecast(forecastData);
    } catch (err) {
      setError('Unable to fetch forecast');
      setStatus('error');
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
        try {
          const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
          setWeather(weatherData);
          await fetchForecast(weatherData.name);
          setStatus('done');
        } catch (err) {
          setError('Unable to fetch weather data');
          setStatus('error');
        }
      });
    } else {
      setError('Geolocation not supported');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="search-section">
        <WeatherSearch onSearch={fetchWeather} geolocationWeather={geolocationWeather} />
      </div>

      {status === 'pending' && <LoadingSpinner />}
      {status === 'error' && <p>{error}</p>}

      {weather && (
        <>
          <WeatherDetails weather={weather} />
          <button onClick={() => addFavorite(weather.name)}>Add to Favorites</button>
        </>
      )}

      {forecast && <ForecastChart forecastData={forecast} />}

      <FavoritesList
        favorites={favorites}
        fetchWeather={fetchWeather}
        removeFavorite={removeFavorite}
      />
    </div>
  );
};

export default App;
