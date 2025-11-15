import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Calendars.css'; // Certifique-se de criar e importar o arquivo CSS
import './YourStyles.css'; 
import './CalendarSection.css'; // Importar o CSS
import CalendarSquare from './CalendarSquare'; // O componente estilizado de calendar
import { FaChevronDown, FaChevronUp, FaPlus, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Calendars = () => {
  const [schedulesCreated, setSchedulesCreated] = useState([]);
  const [schedulesJoined, setSchedulesJoined] = useState([]);
  const [newCalendarName, setNewCalendarName] = useState('');
  const [joinCalendarId, setCalendarId] = useState('');
  const [newCalendarDescription, setNewCalendarDescription] = useState('');
  const history = useHistory();
  const [isExpandedCreated, setIsExpandedCreated] = useState(true);
  const [isExpandedJoined, setIsExpandedJoined] = useState(true);
  const [isCreateSchedulesModalOpen, setIsCreateSchedulesModalOpen] = useState(false); // Estado do modal
  const [isJoinSchedulesModalOpen, setIsJoinSchedulesModalOpen] = useState(false); // Estado do modal
  const [eventCountCreated, setEventCountCreated] = useState(0); // Estado para o número de eventos
  const [eventCountJoined, setEventCountJoined] = useState(0); // Estado para o número de eventos




  const handlePageReload = async () => {
    const user_id = localStorage.getItem('user_id');
    try {
      const response = await axios.get(`https://express-auth-hexagonal-boilerplate.onrender.com/user/${user_id}`);
      console.log('Calendar  geted successfully:', response.data);
      localStorage.setItem('schedulesCreated', JSON.stringify(response.data.schedulesCreated));
      localStorage.setItem('schedulesJoined', JSON.stringify(response.data.schedulesJoined));
    } catch (error) {
      console.error('Error creating calendar:', error);
    }

    setNewCalendarName('');
    setNewCalendarDescription('');
  };


  const toggleSectionCreated = () => {
    setIsExpandedCreated(!isExpandedCreated);
  };

  const toggleSectionJoined = () => {
    setIsExpandedJoined(!isExpandedJoined);
  };

  const openCreateModal = () => {
    setIsCreateSchedulesModalOpen(true);
  };

  const openJoinModal = () => {
    setIsJoinSchedulesModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateSchedulesModalOpen(false);
  };

  const closeJoinModal = () => {
    setIsJoinSchedulesModalOpen(false);
  };

  useEffect(() => {

    handlePageReload();
    const created = localStorage.getItem('schedulesCreated');
    const joined = localStorage.getItem('schedulesJoined');
    
    if (created) {
      console.log('created----------------', created)
      setEventCountCreated(JSON.parse(created).length)
      setSchedulesCreated(JSON.parse(created));
    }

    if (joined) {
      setEventCountJoined(JSON.parse(joined).length)
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
      const response = await axios.post('https://express-auth-hexagonal-boilerplate.onrender.com/createCalendar', newCalendar);
      console.log('Calendar created successfully:', response.data);
      localStorage.setItem('calendar_id', response.data.calendar_id);
      history.push('/Calendario');
      setNewCalendarName('');
      setNewCalendarDescription('');
    } catch (error) {
      console.error('Error creating calendar:', error);
    }
    
  };

   const handleJoinCalendar = async () => {
    const user_id = localStorage.getItem('user_id');
    const body = {
      user_id
    };


    
    console.log('Joing calendar:', joinCalendarId); 
    try {
      const response = await axios.put(`http://localhost:3030/updateSchedulesJoined/${joinCalendarId}`, body);
      console.log('Calendar joineed successfully:', response.data);
      localStorage.setItem('calendar_id', response.data.calendar_id);
      history.push('/Calendario');
      setNewCalendarName('');
      setNewCalendarDescription('');
    } catch (error) {
      console.error('Error creating calendar:', error);
      toast.error(error.response.data.message || `User can't join this schedule`);
    }
    
  };

  const handleCalendarClick = (calendar) => {
    console.log('calendar--in handleCalendarClick--------------', calendar)
    localStorage.setItem('calendar_id', calendar.calendar_id);
    history.push('/Calendario');
  };

  return (
    <div>
      <h1>Calendars</h1>
      {/* Componente para exibir os popups */}
      <ToastContainer />

      <div>
      {/* Schedules Created */}
      <div>
        <div className="section-title">
          {/* Contêiner para o título e o botão "Create" */}
          <div className="left-content">
            <h2>Schedules Created</h2>
            <button className="events-button" onClick={toggleSectionCreated}>
              {eventCountCreated} events
            </button>
            <button className="create-button" onClick={openCreateModal}>
              <FaPlus className="plus-icon" /> Create
            </button>
          </div>

          {/* Botão de minimizar/expandir no lado direito */}
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
          
          
          <div className="left-content">
            <h2>Schedules Joined</h2>
            <button className="events-button" onClick={toggleSectionCreated}>
              {eventCountJoined} events
            </button>
            <button className="create-button" onClick={openJoinModal}>
              <FaPlus className="plus-icon" /> Join
            </button>
          </div>




          {/* Botão de minimizar/expandir no lado direito */}

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

        
      </div>
    </div>

    {/* Modal de criação */}
    {isCreateSchedulesModalOpen && (
        <>
          
          <div className="modal-overlay"></div> Overlay escuro
          <div className = "modal-box">
            <button className="close-button" onClick={closeCreateModal}>
              <FaTimes />
            </button>
            <h3>Create New Calendar</h3>
             <form onSubmit={(e) => {
            e.preventDefault();
            handleCreateCalendar();
            }}>
            <input 
              type="text"
              placeholder="Name"
              className="modal-input" 
              onChange={(e) => setNewCalendarName(e.target.value)}
              required
            />
            <input 
             type="text" 
             placeholder="Description" 
             className="modal-input"
             onChange={(e) => setNewCalendarDescription(e.target.value)} 
             required 
            />
            <button className="create-modal-button" type="submit">Create Calendar</button>
            {/* <button className="create-modal-button" onClick={handleCreateCalendar}>Create</button> */}
          </form>
          </div> 
        </>
    )}

    {/* Modal de join */}
    {isJoinSchedulesModalOpen && (
        <>
          
          <div className="modal-overlay"></div> Overlay escuro
          <div className = "modal-box">
            <button className="close-button" onClick={closeJoinModal}>
              <FaTimes />
            </button>
            <h3>Join New Calendar</h3>
             <form onSubmit={(e) => {
            e.preventDefault();
            handleJoinCalendar();
            }}>
            <input 
              type="text"
              placeholder="Calendar ID"
              className="modal-input" 
              onChange={(e) => setCalendarId(e.target.value)}
              required
            />
            <button className="create-modal-button" type="submit">Join Calendar</button>
            {/* <button className="create-modal-button" onClick={handleCreateCalendar}>Create</button> */}
          </form>
          </div> 
        </>
    )}

    </div>
  );
};

export default Calendars;
