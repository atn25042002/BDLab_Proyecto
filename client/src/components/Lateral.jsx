import { Link } from "react-router-dom";

export function Lateral() {
    return(
        <div className="collateral">
            <h3>Sección</h3>
            <Link className="enlaceLat">Academico</Link><br/>
            <Link className="enlaceLat">Trámites</Link><br/>
            <Link className="enlaceLat">Actv. Artisticas y Deportivas</Link><br/>
            <Link className="enlaceLat">Servicios Universitarios</Link><br/>
            <Link className="enlaceLat">Otros</Link><br/>
            <h3>Avisos</h3><br/>
        </div>
    )
}
