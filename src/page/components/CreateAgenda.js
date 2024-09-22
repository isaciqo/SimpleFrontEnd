import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Calendars.css'; // Certifique-se de criar e importar o arquivo CSS
import './YourStyles.css'; 
import './CalendarSection.css'; // Importar o CSS
import CalendarSquare from './CalendarSquare'; // O componente estilizado de calendar
import { FaChevronDown, FaChevronUp, FaPlus, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar

const Calendars = () => {
  const [schedulesCreated, setSchedulesCreated] = useState([]);
  const [schedulesJoined, setSchedulesJoined] = useState([]);
  const [newCalendarName, setNewCalendarName] = useState('');
  const [newCalendarDescription, setNewCalendarDescription] = useState('');
  const history = useHistory();
  const [isExpandedCreated, setIsExpandedCreated] = useState(true);
  const [isExpandedJoined, setIsExpandedJoined] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal

  const toggleSectionCreated = () => {
    setIsExpandedCreated(!isExpandedCreated);
  };

  const toggleSectionJoined = () => {
    setIsExpandedJoined(!isExpandedJoined);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    console.log('createButton pressed');
    closeModal(); // Fechar o modal após o clique no botão "Create"
  };


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
      const response = await axios.post('http://localhost:3030/createCalendar', newCalendar);
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
      {/* Schedules Created */}
      <div>
        <div className="section-title">
          <h2>Schedules Created </h2>
          <button className="create-button" onClick={openModal}>
          <FaPlus className="plus-icon" /> Create
        </button>
          <button className="toggle-button" onClick={toggleSectionCreated}>
          {isExpandedCreated ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {isExpandedCreated && (
          <div className="calendar-grid">
            {schedulesCreated.length > 0 ? (
              schedulesCreated.map((calendar, index) => (
                <CalendarSquare
                  key={index}
                  calendar={calendar}
                  isJoined={false} // Calendários criados
                  onClick={() => handleCalendarClick(calendar)}
                />
              ))
            ) : (
              <p>No schedules created</p>
            )}
          </div>
        )}
      </div>

      {/* Schedules Joined */}
      <div style={{ marginTop: '20px' }}>
        <div className="section-title">
          <h2>Schedules Joined</h2>
          <button className="toggle-button" onClick={toggleSectionJoined}>
          {isExpandedJoined ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {isExpandedJoined && (
          <div className="calendar-grid">
            {schedulesJoined.length > 0 ? (
              schedulesJoined.map((calendar, index) => (
                <CalendarSquare
                  key={index}
                  calendar={calendar}
                  isJoined={true} // Calendários joined                  
                  onClick={() => handleCalendarClick(calendar)}
                />
              ))
            ) : (
              <p>No schedules joined</p>
            )}
          </div>
        )}

        {/* Modal de criação */}
      {isModalOpen && (
        <>
          {/* <div className="modal-overlay"></div> Overlay escuro */}
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            <h3>Create New Calendar</h3>
            <input type="text" placeholder="Name" className="modal-input" />
            <input type="text" placeholder="Description" className="modal-input" />
            <button className="create-modal-button" onClick={handleCreate}>Create</button>
          </div>
        </>
      )}
      </div>
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
