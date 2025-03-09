import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Details = () => {
  const { IdProducto } = useParams();
  console.log(IdProducto);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [ledValue, setLedValue] = useState(0);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Humidity',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  });

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(`http://localhost:8000/db/productos/${IdProducto}/ultima_temperatura`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la última temperatura');
        }
        const data = await response.json();
        setTemperature(data.ultima_temperatura.valor);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchHumidity = async () => {
      try {
        const response = await fetch(`http://localhost:8000/db/productos/${IdProducto}/ultima_humedad`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la última humedad');
        }
        const data = await response.json();
        setHumidity(data.ultima_humedad.valor);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const responseTemp = await fetch(`http://localhost:8000/db/productos/${IdProducto}/historico_temperatura`);
        const responseHum = await fetch(`http://localhost:8000/db/productos/${IdProducto}/historico_humedad`);
        if (!responseTemp.ok || !responseHum.ok) {
          throw new Error('No se pudo obtener el historial de temperatura o humedad');
        }
        const dataTemp = await responseTemp.json();
        const dataHum = await responseHum.json();

        const labels = dataTemp.historico_temperatura.map(entry => new Date(entry.Fecha).toLocaleTimeString());
        const tempData = dataTemp.historico_temperatura.map(entry => entry.valor);
        const humData = dataHum.historico_humedad.map(entry => entry.valor);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              data: tempData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Humidity',
              data: humData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTemperature();
    fetchHumidity();
    fetchHistoricalData();

    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
      fetchHistoricalData();
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [IdProducto]);

  const handleSliderChange = async (e) => {
    const newValue = e.target.value;
    setLedValue(newValue);
    try {
    const response = await fetch('http://172.20.10.6:80/control_leds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brightness: parseInt(newValue, 10) }),
    });
      if (!response.ok) {
        throw new Error('No se pudo actualizar el valor del LED');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="details-container">
      <h2>Details for Product ID: {IdProducto}</h2>
      <div className="readings">
        <p>Temperature: {temperature.toFixed(2)}°C</p>
        <p>Humidity: {humidity.toFixed(2)}%</p>
      </div>
      <div className="led-control">
        <h3>LEDs</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={ledValue}
          onChange={handleSliderChange}
        />
        <p>LED Value: {ledValue}</p>
      </div>
      <div className="chart">
        <Line data={data} />
      </div>
    </div>
  );
};

export default Details;