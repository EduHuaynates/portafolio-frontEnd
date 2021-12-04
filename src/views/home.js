import "../styles/home.css";
// import NavBar from "../components/navBar/navBar";
import Card from "../components/cards/card";
import Table from "../components/table/table";
import ModInvest from "./modInvest";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Home({ usuario }) {
  const [inv, setInv] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(1);
  const [modalData, setModalData] = useState({
    empresa: "",
    capital: "",
    t_anual: "",
    periodo: "",
    status: "",
    i_mensual: "",
  });
  useEffect(() => {
    async function loadInvest() {
      try {
        const { data } = await Axios.get(`/api/invest?user=${usuario._id}`);
        // console.log(data);
        setInv(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadInvest();
  }, [modal, usuario]);

  return (
    <>
      <main className="main">
        <div className="resume_container">
          <div className="main_resume">
            <Card
              title={"Capital Invertido"}
              kpi={"63,000 S/."}
              color={`rgb(214, 232, 245)`}
              fontColor={`rgb(40, 152, 233)`}
              classIcon={`fas fa-hand-holding-usd`}
            />
            <Card
              title={"Interes Total"}
              kpi={"15,000 S/."}
              color={`rgb(254, 231, 218)`}
              fontColor={`rgb(239, 121, 46)`}
              classIcon={`fas fa-piggy-bank`}
            />
            <Card
              title={"Interes Promedio"}
              kpi={"19.77%"}
              color={`rgb(240, 221, 255)`}
              fontColor={`rgb(141, 29, 235)`}
              classIcon={`fas fa-percentage`}
            />
            <Card
              title={"# Inversiones Activas"}
              kpi={"12"}
              color={`rgb(254, 247, 217)`}
              fontColor={`rgb(234, 207, 52)`}
              classIcon={`fas fa-chart-line`}
            />
          </div>
        </div>

        <div className="main_investments">
          <h1 className="main_title">Portafolio EH</h1>
          <button
            className="add_investment"
            onClick={() => {
              setModal(true);
              setModalData({
                empresa: "",
                capital: "",
                t_anual: "",
                periodo: "",
                status: "",
                i_mensual: "",
              });
              setType(1);
            }}
          >
            Agregar Inversion
          </button>
          <Table
            inv={inv}
            closeModal={setModal}
            setModalData={setModalData}
            setType={setType}
          />
        </div>
      </main>
      {/* <Outlet /> */}
      {modal && (
        <ModInvest
          usuario={usuario}
          closeModal={setModal}
          modalData={modalData}
          type={type}
        />
      )}
    </>
  );
}
