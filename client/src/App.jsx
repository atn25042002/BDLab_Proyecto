import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {TareasPagina} from "./pages/TareasPagina";
import {FormPagina} from "./pages/FormPagina";
import { Navegacion } from "./components/Navegacion";
import { Lateral } from "./components/Lateral";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navegacion/>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TareasPagina/>} />
        <Route path="/create" element={<FormPagina/>} />
        <Route path="/tasks/:id" element={<FormPagina/>} />
      </Routes>
      <Toaster/> 
    </BrowserRouter>
  );
}

export default App;