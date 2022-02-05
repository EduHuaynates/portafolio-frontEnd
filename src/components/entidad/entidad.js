import "./entidad.css";
import { Link } from "react-router-dom";

export default function Entidad({ entidad, type }) {
  // console.log(entidad, "H");
  return (
    <Link className="link" to={`/entidades/${entidad._id}`}>
      {type === "V" ? (
        <div className="entidad_container">
          {/* <div className="entidad_new_project_container">Nuevo</div> */}
          <div className="entidad_header_container">
            <div className="entidad_title">{entidad.Empresa}</div>
          </div>
          <div className="entidad_logo_container">
            <img className="entidad_logo" src={entidad.Logo} alt="" />
          </div>
          <div className="entidad_main">
            <div className="entidad_type">{entidad.TipoInversion}</div>
            <button className="entidad_oportunida_activa">
              Oportunidades Activas
            </button>
            <div className="entidad_metrics">
              <div className="entidad_inversiones">
                35 inversiones realizadas
              </div>
              <div className="entidad_inversiones">
                5 Inversionitas participando
              </div>
            </div>
            <div className="entidad_rate_container">
              4.5 <i className="fas fa-coins"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="entidad_container_h">
          <div className="entidad_logo_container_h">
            <img className="entidad_logo" src={entidad.Logo} alt="" />
          </div>
          <div className="entidad_main_h">
            <div className="entidad_title">{entidad.Empresa}</div>
            {/* <div className="entidad_type">{entidad.TipoInversion}</div> */}
            {/* <div className="entidad_inversiones">35 inversiones realizadas</div> */}
          </div>
        </div>
      )}
    </Link>
  );
}
