import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherData = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  return response.data;
};

export const fetchForecastData = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  return response.data.list;
};

export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  );
  return response.data;
};
