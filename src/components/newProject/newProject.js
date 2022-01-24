import "./newProject.css";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";

export default function newProject({ mantein, project, key }) {
  // console.lo g(project, "projectin");
  return (
    <div key={key} className="newProject_Wrapper">
      {mantein ? "" : <div className="newAlert"> Nuevo </div>}
      <div className="newProject_Header">
        <div className="newProject_Logo_Container">
          {mantein ? (
            <ToggleSwitch
              key={project.estado}
              projectId={project._id}
              initialState={project.estado}
            />
          ) : (
            <img
              className="newProject_Entitie_Logo"
              src="https://yt3.ggpht.com/ytc/AKedOLRxPWwhGyi0FPMLqQsV0opQ59lMBwESKl65ihFfeQ=s900-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          )}
        </div>
        <p className="newProject_Title">{project.empresa}</p>
        {/* <p className="newProject_Title">Hola</p> */}
      </div>
      <div className="newProject_Body">
        <div className="newProject_TasaAnual">
          <p className="newProjectMetric">{project.t_anual}</p>
          {/* <p className="newProjectMetric">0.2</p> */}
          <p className="newProjectDesc">% Interes Anual </p>
        </div>
        <div className="newProject_Periodo">
          <p className="newProjectMetric">{project.periodo} meses</p>
          {/* <p className="newProjectMetric">5 meses</p> */}
          <p className="newProjectDesc">Al Final</p>
        </div>
      </div>
    </div>
  );
}
