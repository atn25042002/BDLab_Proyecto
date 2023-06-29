import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lateral } from "../components/Lateral";
import { crearTarea, eliminarTarea, actualizarTarea, obtenerTarea } from "../api/taskApi";
import { useNavigate, useParams } from "react-router-dom";

export function FormPagina() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
    } = useForm();
    const navigate= useNavigate();
    const params= useParams();
    const onSubmit = handleSubmit(async data => {
        if(params.id){
            await actualizarTarea(params.id,data);
        } else{
            await crearTarea(data);
        }        
        navigate("/tasks");
    });

    useEffect(()=> {
        async function cargarTarea(){
            if(params.id){
                const {data}= await obtenerTarea(params.id);
                setValue('titulo', data.titulo);
                setValue('descripcion', data.descripcion);
            }  
        }
        cargarTarea();
    },[])

    return(
        <div className="columnas">
            <Lateral/>
            <div className="colcentral">
                <form className="form" onSubmit={onSubmit}>
                    <label className="frm lbl">Nombre de la Tarea</label>
                    <input className="frm inp" type="text" placeholder="Titulo corto de la Tarea"
                        {...register("titulo",{required: true})}/>
                    {errors.titulo && <span>Este campo es requerido</span>}
                    <label className="frm lbl">Descripción</label>
                    <textarea className="frm txt" rows="3" placeholder="Descripción breve de la Tarea"
                        {...register("descripcion",{required: true})}></textarea>
                    {errors.descripcion && <span>Este campo es requerido</span>}
                    <button className="frm btt">Guardar Tarea</button>
                </form>

                {params.id &&
                    <button className="formulario" onClick={async ()=> {
                        const aceptada = window.confirm("¿Estas seguo(a)?");
                        if(aceptada){
                            await eliminarTarea(params.id);
                            navigate("/tasks");
                        }
                    }}>Eliminar Tarea</button>}
            </div>
        </div>

    );
}