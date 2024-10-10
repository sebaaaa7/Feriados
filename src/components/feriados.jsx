export const fetchHolidays = async () => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const response = await fetch('https://api.boostr.cl/holidays.json', options);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  if (!Array.isArray(data.data)) throw new Error('Data is not an array');
  return data.data;
};

  
  