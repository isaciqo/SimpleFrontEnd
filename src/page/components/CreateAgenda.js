import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Calendars.css'; // Certifique-se de criar e importar o arquivo CSS

const Calendars = () => {
  const [schedulesCreated, setSchedulesCreated] = useState([]);
  const [schedulesJoined, setSchedulesJoined] = useState([]);
  const [newCalendarName, setNewCalendarName] = useState('');
  const [newCalendarDescription, setNewCalendarDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    const created = localStorage.getItem('schedulesCreated');
    const joined = localStorage.getItem('schedulesJoined');

    if (created) {
      console.log('created----------------', created)
      setSchedulesCreated(JSON.parse(created));
    }

    if (joined) {
      setSchedulesJoined(JSON.parse(joined));
    }
  }, []);

  const handleCreateCalendar = async () => {
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
    history.push('/Calendario');
    setNewCalendarName('');
    setNewCalendarDescription('');
  };

  const handleCalendarClick = (calendar) => {
    console.log('calendar--in handleCalendarClick--------------', calendar)
    localStorage.setItem('calendar_id', calendar.calendar_id);
    history.push('/Calendario');
  };

  return (
    <div>
      <h1>Calendars</h1>

      <div>
        <h2>Schedules Created</h2>
        {schedulesCreated.length > 0 ? (
          <div className="calendar-grid">
            {schedulesCreated.map((calendar, index) => (
              <div 
                key={index}
                className="calendar-square" 
                onClick={() => handleCalendarClick(calendar)}
              >
                {calendar.name}
              </div>
            ))}
          </div>
        ) : (
          <p>No schedules created</p>
        )}
      </div>

      <div>
        <h2>Schedules Joined</h2>
        {schedulesJoined.length > 0 ? (
          <div className="calendar-grid">
            {schedulesJoined.map((calendar, index) => (
              <div 
                key={index} 
                className="calendar-square" 
                onClick={() => handleCalendarClick(calendar.id)}
              >
                {calendar.name}
              </div>
            ))}
          </div>
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
