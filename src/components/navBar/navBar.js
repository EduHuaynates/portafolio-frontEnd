import "./navBar.css";
import { Link } from "react-router-dom";

export default function navBar({ usuario }) {
  return (
    <nav className="navBar_container">
      <div className="logo_container">
        <i className="fas fa-map-marker-alt"></i>
        GPS
      </div>

      <div className="options_container">
        <ul className="navBar_list_container">
          <li className="list_item">
            <Link className="link" to="/">
              Inversiones
            </Link>
          </li>
          <li className="list_item">
            <Link className="link" to="/entidades">
              Entidades
            </Link>
          </li>
          {/* <li className="list_item">  </li> */}
        </ul>

        {usuario ? (
          <div className="login_container">
            <ul className="login_list_container">
              <li className="login_item">Edu Huaynates</li>
            </ul>
          </div>
        ) : (
          <div className="login_container">
            <ul className="login_list_container">
              <li className="login_item">
                <Link className="link" to="/">
                  Iniciar Sesion
                </Link>
              </li>
              <li className="login_item">
                <Link className="link" to="/signup">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
