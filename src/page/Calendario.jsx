import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './components/calendarioCss.css';
import Adicionar from './components/adicionar/Adicionar';
import CustomTollbar from './components/CustomCalendar/CustomTollbar';
import axios from 'axios';


import eventosPadrao from './components/Eventos/EventosPadrao'
import EventModal from './components/EventModal';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
let newCalendarInformation
function Calendario (){
    

      // Recupera os dados do servidor quando o componente é montado
    useEffect(() => {
        const fetchData = async () => {
        try {
            const calendar_id = localStorage.getItem('calendar_id');
            const response = await axios.get(`https://express-auth-hexagonal-boilerplate.onrender.com/calendar/${calendar_id}`);
            const { calendarInformation} = response.data;
            newCalendarInformation = calendarInformation
            console.log('calendarInformation-----------', calendarInformation)
            // Armazenar no localStorage se necessário
            localStorage.setItem('schedulesCreated', JSON.stringify(calendarInformation));
            setEventos(calendarInformation)
        } catch (error) {
            console.error('Error fetching calendars:', error);
        }
        };

        fetchData();
    }, []);

    const [eventos, setEventos] = useState(newCalendarInformation)
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento)
    }
    const handleEventClose = () => {
        setEventoSelecionado(null)
    }

    const eventStyle = (event) => ({
        style:{
            backgroundColor: event.color
        }
    })

    const handleAdicionar = async (novoEvento) => {
        //Logica do banco
        const user_id = localStorage.getItem('user_id');
        const calendar_id = localStorage.getItem('calendar_id');
        const token = localStorage.getItem('token');
        console.log('antes do post ------------', user_id)
        console.log('antes do post novoEvento------------', novoEvento)
        const response = await axios.put(`https://express-auth-hexagonal-boilerplate.onrender.com/updateCalendar/${calendar_id}`, {
            calendarInformation:[{
                id: 1,
                title:'atividade 1',
                start: novoEvento.start,
                end: novoEvento.end,
                desc:'primeira atividade',
                color:'red',
                type:'atividade',
                user_id
            }]
        });
        console.log('post response ------------', response)
        setEventos([...eventos,{...novoEvento,id:eventos.length + 1}]);


    };

    const handleEventDelete= (eventId) =>{
        //Logica do banco
       const updatedEvents = eventos.filter((event) => event.id !== eventId)
       setEventos(updatedEvents);
       setEventoSelecionado(null);
   };

   const handleEventUpdate = (updatedEvent) =>{
        //Logica do banco
       const updatedEvents = eventos.map((event) =>{
           if(event.id === updatedEvent.id){
               return updatedEvent;
           }
           return event;
       });
       setEventos(updatedEvents);
       setEventoSelecionado(null);
   }

    const onEventDrop = (data) => {
        
        const { start, end } = data
        const updateEvents = eventos.map((event) =>{
            if(event.id === data.event.id){
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end)
                }
            }
            return event;
        })

        setEventos(updateEvents)
    }

    const onEventResize = (data) => {
        
        const { start, end } = data
        const updateEvents = eventos.map((event) =>{
            if(event.id === data.event.id){
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end)
                }
            }
            return event;
        })

        setEventos(updateEvents)
    }

    return(
        <div className='tela'>
            <div className="toolbar">
                <p> Ferramentas </p>
                    <Adicionar onAdicionar={ handleAdicionar}/>
            </div>
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView='month'
                events={eventos}
                localizer={localizer}
                resizable
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                onSelectEvent={handleEventClick}
                className='calendar'
                components={{
                    toolbar: CustomTollbar
                }}
                eventPropGetter={eventStyle}

            />
        { eventoSelecionado && (
            <EventModal
                evento = { eventoSelecionado}
                onClose = {handleEventClose}
                onDelete = {handleEventDelete}
                onUpdate = {handleEventUpdate}
            />
        )}
        </div>
    )
}



export default Calendario