import React from "react";
import './calendarioCss.css';


const eventModal =({evento, onClose}) => {
    return(
        <div className="modal">
            <div className="modal-content">
                <h2>{evento.title}</h2>
                <p>{evento.desc}</p>
                <p>Início: {evento.start.toLocaleString()}</p>
                <p>Final: {evento.end.toLocaleString()}</p>
                <button onClick={onClose }>fechar</button>
            </div>

        </div>
    )

}

export default eventModal