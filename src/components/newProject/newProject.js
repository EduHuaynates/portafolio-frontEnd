import "./newProject.css";

export default function newProject() {
  return (
    <div className="newProject_Wrapper">
      <div className="newAlert"> Nuevo </div>
      <div className="newProject_Header">
        <div className="newProject_Logo_Container">
          <img
            className="newProject_Entitie_Logo"
            src="https://www.credi.coop/wp-content/uploads/2021/02/LOGO-COMPLETO.png"
            alt=""
          />
        </div>
        <p className="newProject_Title">Cruz Soluciones Integrales</p>
      </div>
      <div className="newProject_Body">
        <div className="newProject_TasaAnual">
          <p className="newProjectMetric">14%</p>
          <p className="newProjectDesc">% Interes Anual </p>
        </div>
        <div className="newProject_Periodo">
          <p className="newProjectMetric">5 meses</p>
          <p className="newProjectDesc">Al Final</p>
        </div>
      </div>
    </div>
  );
}
