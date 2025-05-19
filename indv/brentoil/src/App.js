import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const months = [
  { name: 'Січень', value: '01' },
  { name: 'Лютий', value: '02' },
  { name: 'Березень', value: '03' },
  { name: 'Квітень', value: '04' },
  { name: 'Травень', value: '05' },
  { name: 'Червень', value: '06' },
  { name: 'Липень', value: '07' },
  { name: 'Серпень', value: '08' },
  { name: 'Вересень', value: '09' },
  { name: 'Жовтень', value: '10' },
  { name: 'Листопад', value: '11' },
  { name: 'Грудень', value: '12' },
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const API_KEY = 'eUJcWtfa8yXr0CSf1f9RQYbFpmsgbtDFP0DgAIYU';
        const response = await axios.get('https://api.eia.gov/v2/seriesid/PET.RBRTE.M', {
          params: {
            api_key: API_KEY,
          },
        });

        const data = response.data.response.data;

        const match = data.find(entry => entry.period.startsWith('2025') && entry.period.endsWith(selectedMonth));

        if (!match) {
          setPrice(null);
          setError('Немає даних за обраний місяць');
        } else {
          setPrice(match.value);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        setError('Помилка при отриманні даних з EIA');
        setPrice(null);
      }
    };

    fetchPrice();
  }, [selectedMonth]);

  return (
    <div className="App">
      <h1 id="Title">Котирування Brent за 2025 рік 🌍🛢</h1>
      <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.name}
          </option>
        ))}
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {price && <p style={{ color: 'aliceblue' }}>Середня ціна: {price} USD/барель</p>}
    </div>
  );
}

export default App;
