import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo_Solo_Ico } from "../../icons/Logo_Solo_Ico.svg";
import { ReactComponent as Bxs_Dashboard } from "../../icons/bxs-dashboard.svg";
import { ReactComponent as Bx_Cabinet } from "../../icons/bx-cabinet.svg";
import { ReactComponent as Bxs_Wallet } from "../../icons/bxs-wallet.svg";
import { ReactComponent as Bxs_Folder_Plus } from "../../icons/bxs-folder-plus.svg";
import { ReactComponent as Bx_Scatter_Chart } from "../../icons/bx-scatter-chart.svg";
import { ReactComponent as Bx_Cube_Alt } from "../../icons/bx-cube-alt.svg";
import { ReactComponent as Bxs_Business } from "../../icons/bxs-business.svg";
import { ReactComponent as Bx_Star } from "../../icons/bxs-star.svg";

export default function SideBar() {
  return (
    <aside className="sideBar_Container">
      <div className="Logo_Container">
        <Logo_Solo_Ico className="Logo" />
      </div>
      <ul className="sideBar_List">
        <li className="sideBar_Item">
          <NavLink className="sideBar_link" to="/" activeClassName="selected">
            {/* <i className="fas fa-chart-pie " /> */}
            <Bxs_Dashboard className="icon inactive" />
            <span className="sideBar_Item_Desc">Dashboard</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/entidades"
            activeClassName="selected"
          >
            {/* <i className="fas fa-building icon inactive" /> */}
            <Bx_Cabinet className="icon inactive" />
            <span className="sideBar_Item_Desc"> Oportunidades</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/oportu"
            activeClassName="selected"
          >
            {/* <i className="fas fa-lightbulb icon inactive" /> */}
            <Bxs_Wallet className="icon inactive" />
            <span className="sideBar_Item_Desc"> Inversiones</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/oportu"
            activeClassName="selected"
          >
            {/* <i className="fas fa-lightbulb icon inactive" /> */}
            <Bxs_Folder_Plus className="icon inactive" />
            <span className="sideBar_Item_Desc"> Configuración</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/oportu"
            activeClassName="selected"
          >
            {/* <i className="fas fa-lightbulb icon inactive" /> */}
            <Bx_Scatter_Chart className="icon inactive" />
            <span className="sideBar_Item_Desc"> Simulaciones</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/oportu"
            activeClassName="selected"
          >
            {/* <i className="fas fa-lightbulb icon inactive" /> */}
            <Bx_Cube_Alt className="icon inactive" />
            <span className="sideBar_Item_Desc"> Recursos Utiles</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/oportu"
            activeClassName="selected"
          >
            {/* <i className="fas fa-lightbulb icon inactive" /> */}
            <Bxs_Business className="icon inactive" />
            <span className="sideBar_Item_Desc"> Mantenimiento Empresas</span>
          </NavLink>
        </li>
        <li className="sideBar_Item">
          <NavLink
            className="sideBar_link"
            to="/oportu"
            activeClassName="selected"
          >
            {/* <i className="fas fa-lightbulb icon inactive" /> */}
            <Bx_Star className="icon inactive" />
            <span className="sideBar_Item_Desc">
              Registro Nuevas Oportunidades
            </span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
