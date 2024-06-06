import React, { useState } from 'react';
import axios from 'axios';

const CreateCalendar = () => {
  const [createdBy, setCreatedBy] = useState('');
  const [users, setUsers] = useState('');
  const [calendarInformation, setCalendarInformation] = useState([
    { user: '', firstDay: '', lastDay: '', status: '' }
  ]);

  const handleSubmit = async () => {
    const user_id = localStorage.getItem('user_id');
    const calendarData = {
      createdBy: user_id,
      users: [],
      calendarInformation:[]
    };

    try {
      const response = await axios.post('http://localhost:3030/users/createCalendar', calendarData);
      console.log('Calendar created successfully:', response.data);
      localStorage.setItem('calendar_id', response.calendar_id);
    } catch (error) {
      console.error('Error creating calendar:', error);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedCalendarInformation = [...calendarInformation];
    updatedCalendarInformation[index][field] = value;
    setCalendarInformation(updatedCalendarInformation);
  };

  return (
    <div>
      <h1>Create Calendar</h1>
      <div>
        <label>Created By:</label>
        <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} />
      </div>
      <div>
        <label>Users (comma separated):</label>
        <input type="text" value={users} onChange={(e) => setUsers(e.target.value)} />
      </div>
      <h2>Calendar Information</h2>
      {calendarInformation.map((info, index) => (
        <div key={index}>
          <label>User:</label>
          <input type="text" value={info.user} onChange={(e) => handleChange(index, 'user', e.target.value)} />
          <label>First Day:</label>
          <input type="text" value={info.firstDay} onChange={(e) => handleChange(index, 'firstDay', e.target.value)} />
          <label>Last Day:</label>
          <input type="text" value={info.lastDay} onChange={(e) => handleChange(index, 'lastDay', e.target.value)} />
          <label>Status:</label>
          <input type="text" value={info.status} onChange={(e) => handleChange(index, 'status', e.target.value)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Create Calendar</button>
    </div>
  );
};

export default CreateCalendar;