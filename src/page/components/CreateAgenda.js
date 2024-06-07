import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Calendars = () => {
  const [schedulesCreated, setSchedulesCreated] = useState([]);
  const [schedulesJoined, setSchedulesJoined] = useState([]);
  const [newCalendarName, setNewCalendarName] = useState('');
  const [newCalendarDescription, setNewCalendarDescription] = useState('');
  const history = useHistory();


  // Recupera os dados do localStorage quando o componente é montado
  useEffect(() => {
    const created = localStorage.getItem('schedulesCreated');
    const joined = localStorage.getItem('schedulesJoined');

    if (created) {
      setSchedulesCreated(created.split(','));
    }

    if (joined) {
      setSchedulesJoined(joined.split(','));
    }
  }, []);

  // Função para lidar com a criação de um novo calendário
  const  handleCreateCalendar =  async () => {
    // Implemente a lógica para enviar os dados do novo calendário para o servidor
    // e atualizar os dados do localStorage conforme necessário
    const user_id = localStorage.getItem('user_id');
    const newCalendar = {
      name: newCalendarName,
      description: newCalendarDescription,
      createdBy: user_id,
      users: [],
      calendarInformation: []
    };
    console.log('Creating calendar:', newCalendar); 
    try {
      const response = await axios.post('http://localhost:3030/users/createCalendar', newCalendar);
      console.log('Calendar created successfully:', response.data);
      localStorage.setItem('calendar_id', response.data.calendar_id);
    } catch (error) {
      console.error('Error creating calendar:', error);
    }
    history.push('/Calendario'); // Adicione esta linha
    // Resetar os campos de input
    setNewCalendarName('');
    setNewCalendarDescription('');
  };

  return (
    <div>
      <h1>Calendars</h1>

      <div>
        <h2>Schedules Created</h2>
        {schedulesCreated.length > 0 ? (
          <ul>
            {schedulesCreated.map((calendar, index) => (
              <li key={index}>{calendar}</li>
            ))}
          </ul>
        ) : (
          <p>No schedules created</p>
        )}
      </div>

      <div>
        <h2>Schedules Joined</h2>
        {schedulesJoined.length > 0 ? (
          <ul>
            {schedulesJoined.map((calendar, index) => (
              <li key={index}>{calendar}</li>
            ))}
          </ul>
        ) : (
          <p>No schedules joined</p>
        )}
      </div>

      <div>
        <h2>Create New Calendar</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleCreateCalendar();
        }}>
          <div>
            <label>
              Name:
              <input 
                type="text" 
                value={newCalendarName} 
                onChange={(e) => setNewCalendarName(e.target.value)} 
                required 
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input 
                type="text" 
                value={newCalendarDescription} 
                onChange={(e) => setNewCalendarDescription(e.target.value)} 
                required 
              />
            </label>
          </div>
          <button type="submit">Create Calendar</button>
        </form>
      </div>
    </div>
  );
};

export default Calendars;