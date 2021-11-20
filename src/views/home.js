import "../styles/home.css";
import NavBar from "../components/navBar/navBar";
import Card from "../components/cards/card";
import Table from "../components/table/table";

export default function home() {
  return (
    <>
      <NavBar />
      <main className = "">
        <div className="resume_container">
          <div className="main_resume">
            <Card title={"Capital Invertido"} kpi={"63,000 S/."} />
            <Card title={"Interes Total"} kpi={"15,000 S/."} />
            <Card title={"% Interes Promedio"} kpi={"19.77%"} />
            <Card title={"# Inversiones Activas"} kpi={"12"} />
          </div>
        </div>
        <div className="main_investments">
          <Table />
        </div>
      </main>
    </>
  );
}
