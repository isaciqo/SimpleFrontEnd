import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Ícones
import axios from 'axios';

const CalendarSquare = ({ calendar, onClick, isJoined }) => {

  const handleEditClick = (e) => {
    e.stopPropagation(); // Impede que o clique no ícone dispare o clique no quadrado principal
    console.log("Edit icon clicked");
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Impede que o clique no ícone dispare o clique no quadrado principal
    const body = {
      user_id: localStorage.getItem('user_id')
    }
    const response = await axios.delete(`http://localhost:3030/deleteSchedules/${calendar.calendar_id}`, body);
    console.log('Calendar joineed successfully:', calendar.calendar_id);
    console.log("Delete icon clicked");
  };

  return (
    <div className="calendar-square" onClick={onClick}>
      {/* Altera a cor do retângulo com base em isJoined */}
      <div className={`calendar-rectangle ${isJoined ? 'joined' : 'created'}`}></div>

      <div className="text-content">
        <div className="title">{calendar.name}</div>
        <div className="subtitle">{calendar.description || "No description"}</div>
        <div className="date">{calendar.date || "No date available"}</div>
      </div>

      <div className="icons-container">
        {/* Só mostra o ícone de editar se não for um calendário "joined" */}
        {!isJoined && (
          <div className="icon-circle" onClick={handleEditClick}>
            <FaEdit className="icon" />
          </div>
        )}
        <div className="icon-circle" onClick={handleDeleteClick}>
          <FaTrash className="icon" />
        </div>
      </div>
    </div>
  );
};

export default CalendarSquare;
