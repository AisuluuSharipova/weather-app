import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ForecastChart = ({ forecastData }) => {
  const labels = forecastData.map((item) => item.dt_txt.split(' ')[0]);
  const temperatures = forecastData.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        backgroundColor: 'rgba(0, 123, 255, 0.7)',
        borderWidth: 2,
        barThickness: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: '5-Day Weather Forecast',
        font: {
          size: 18,
        },
        color: '#fff', 
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: {
            size: 14,
          },
          color: '#fff', 
        },
        ticks: {
          stepSize: 1,
          color: '#fff', 
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
          },
          color: '#fff', 
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          color: '#fff', 
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '700px', margin: 'auto', paddingTop: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ForecastChart;
