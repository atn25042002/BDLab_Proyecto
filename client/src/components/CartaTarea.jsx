import { Navigate, useNavigate } from "react-router-dom";

export function CartaTarea({tarea}) {

    const navigate= useNavigate()

    return(
        <div className="tarjeta"
            onClick={()=>{
                navigate("/tasks/" + tarea.id)
            }}
        >
            <h1 className="tituloTarea">{tarea.titulo}</h1>
            <p>{tarea.descripcion}</p>
        </div>
    );
}