import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const ForecastChart = ({ forecastData }) => {
  const labels = forecastData.map((item) => item.dt_txt.split(' ')[0]);
  const temperatures = forecastData.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '5-Day Weather Forecast',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ForecastChart;
