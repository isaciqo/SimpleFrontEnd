import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './components/calendarioCss.css';

import eventosPadrao from './components/Eventos/EventosPadrao'
import EventModal from './components/EventModal';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario (){
    const [eventos, setEventos] = useState(eventosPadrao)
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento)
    }
    const handleEventClose = () => {
        setEventoSelecionado(null)
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
        <div>
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

            />
        { eventoSelecionado && (
            <EventModal 
                evento = { eventoSelecionado}
                onClose = {handleEventClose}
            />
        )}
        </div>
    )
}

export default Calendario