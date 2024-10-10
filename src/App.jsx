import './App.css';
import '@mantine/core/styles.css';
import { Text, Button, Group, Container, Paper, Timeline, Box, Notification, Title, Card } from '@mantine/core';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';

const holidaysData = [
  { name: 'Año Nuevo', date: '2024-01-01' },
  { name: 'Viernes Santo', date: '2024-03-29' },
  { name: 'Sábado Santo', date: '2024-03-30' },
  { name: 'Día del Trabajador', date: '2024-05-01' },
  { name: 'Día de las Glorias Navales', date: '2024-05-21' },
  { name: 'Elecciones Primarias Alcaldes y Gobernadores', date: '2024-06-09' },
  { name: 'Día Nacional de los Pueblos Indígenas', date: '2024-06-20' },
  { name: 'Día de la Virgen del Carmen', date: '2024-07-16' },
  { name: 'Asunción de la Virgen', date: '2024-08-15' },
  { name: 'Día de la Independencia', date: '2024-09-18' },
  { name: 'Primer día de la Semana de Fiestas Patrias', date: '2024-09-19' },
  { name: 'Segundo día de la Semana de Fiestas Patrias', date: '2024-09-20' },
  { name: 'Tercer día de la Semana de Fiestas Patrias', date: '2024-09-21' },
  { name: 'Cuarto día de la Semana de Fiestas Patrias', date: '2024-09-22' },
  { name: 'Aniversario del Ejército', date: '2024-09-25' },
  { name: 'Día de la Marina', date: '2024-10-18' },
  { name: 'Día de la Aviación', date: '2024-10-31' },
  { name: 'Día de Todos los Santos', date: '2024-11-01' },
  { name: 'Día de la Inmaculada Concepción', date: '2024-12-08' },
  { name: 'Navidad', date: '2024-12-25' },
];

const getNextHoliday = () => {
  const today = dayjs();
  return holidaysData.find(holiday => dayjs(holiday.date).isAfter(today));
};

function App() {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const nextHoliday = getNextHoliday();

  useEffect(() => {
    setHolidays(holidaysData);
    setFilteredHolidays(holidaysData);
    setLoading(false);
  }, []);

  const filterHolidaysByMonth = (month) => {
    const filtered = holidays.filter(holiday => {
      const holidayMonth = dayjs(holiday.date).month();
      return holidayMonth === month;
    });
    setFilteredHolidays(filtered);
    setSelectedDate(new Date(2024, month, 1));
    setShowCalendar(true);
  };

  const showAllHolidays = () => {
    setFilteredHolidays(holidays);
    setSelectedDate(new Date());
    setShowCalendar(false);
  };

  const formatDate = (date) => 
    dayjs(date).format('DD-MM-YYYY');

  return (
    <Container size="md" className="container" mt="xl">
      {nextHoliday && (
        <Notification className="notification" title="Próximo Feriado" color="teal" onClose={() => {}}>
          {nextHoliday.name} - {formatDate(nextHoliday.date)}
        </Notification>
      )}

      <Paper shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Title order={1}>Feriados Legales en Chile 2024</Title>
          <Button onClick={showAllHolidays}>Mostrar Todo</Button>
        </Group>

        <Group spacing="xs" mt="md">
          {Array.from({ length: 12 }, (_, i) => (
            <Button key={i} onClick={() => filterHolidaysByMonth(i)} variant="outline" color="blue">
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </Button>
          ))}
        </Group>
      </Paper>

      {showCalendar && (
        <Box mt="xl" style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              view="month"
              activeStartDate={selectedDate
                ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
                : new Date()}
              tileContent={({ date }) => {
                const holiday = filteredHolidays.find(holiday => dayjs(holiday.date).isSame(date, 'date'));
                return holiday ? (
                  <span className="holiday-mark"></span>
                ) : null;
              }}
              tileClassName={({ date }) => {
                const holiday = filteredHolidays.find(holiday => dayjs(holiday.date).isSame(date, 'date'));
                return holiday ? 'holiday' : null; 
              }}
            />

        </Box>
      )}

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Paper shadow="sm" padding="lg" radius="md" withBorder mt="xl">
          <Timeline active={filteredHolidays.length - 1} bulletSize={24} lineWidth={2}>
            {filteredHolidays.map((holiday, index) => (
              <Timeline.Item key={index} title={holiday.name}>
                <Card shadow="xs" padding="md" style={{ marginBottom: '10px' }}>
                  <Text color="dimmed" size="sm">{formatDate(holiday.date)}</Text>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </Paper>
      )}
    </Container>
  );
}

export default App;