import {Link} from "react-router-dom";

export function Navegacion() {
    return(
        <header>
            <div className="logo">
                <Link to="/tasks">
                    <img src="src/images/logoTareas.jpg" alt="Logo"/>
                </Link>                
            </div>
            <nav>
                <Link className="textCabeza" to="/tasks"><h1>Tareas</h1></Link>
                <Link className="textCabeza" to="/create">Crear</Link>
            </nav>            
        </header>
    )
}