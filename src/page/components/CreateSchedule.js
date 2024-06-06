import React, { useState } from 'react';
import axios from 'axios';

const CreateSchedule = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3030/users/createCalendar', {
        name,
        email,
        startDate,
        endDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Schedule created successfully');
    } catch (error) {
      setMessage('Failed to create schedule');
    }
  };

  return (
    <div>
      <h2>Create Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Create Schedule</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateSchedule;
