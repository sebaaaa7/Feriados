import './App.css';
import { Card, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { fetchHolidays } from './components/feriados';

function App() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHolidays = async () => {
      try {
        const data = await fetchHolidays();
        setHolidays(data);
      } finally {
        setLoading(false);
      }
    };

    loadHolidays();
  }, []);

  const formatDate = (date) => 
    new Date(date).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <Card className="card">
      <Text className="card-header">Feriados legales</Text>
      {loading ? (
        <Text className="loading-text">Loading...</Text>
      ) : (
        <ul className="holiday-list">
          {holidays.map((holiday, index) => (
            <li key={index} className="holiday-item">{holiday.name} - {formatDate(holiday.date)}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default App;
