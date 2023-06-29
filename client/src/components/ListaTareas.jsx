import { useEffect, useState } from "react";
import { getAllTareas } from "../api/taskApi";
import { CartaTarea } from "./CartaTarea";

export function ListaTareas() {    
    const[tareas, setTareas]= useState([]);
    useEffect(()=>{
        async function cargarTareas() {
            const res= await getAllTareas();
            setTareas(res.data);
        }
        cargarTareas();
    },[]);

    return(
        <div>
            {tareas.map(tarea  => (
                <CartaTarea key={tarea.id} tarea={tarea}/>               
            ))}
        </div>
    );
}