import React from 'react';

const FavoritesList = ({ favorites, fetchWeather, removeFavorite }) => {
  return (
    <div>
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

export default FavoritesList;
