import axios from 'axios'

const tareaApi= axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks',
})

export const getAllTareas = () =>{
    return tareaApi.get('/');
}

export const obtenerTarea = (id) => {
    return tareaApi.get('/' + id + '/');
}

export const crearTarea = (task) =>{
    return tareaApi.post('/', task);
}

export const eliminarTarea =(id) =>{
    return tareaApi.delete('/' + id);
}

export const actualizarTarea = (id, task) =>{
    return tareaApi.put('/' + id + '/', task);
}