import "../styles/home.css";
// import NavBar from "../components/navBar/navBar";
import Card from "../components/cards/card";
import TablePortafolio from "../components/table/table";
import PieChart from "../components/pieChart/pieChart";
import ModInvest from "./modInvest";
import Axios from "axios";
import { useEffect, useState } from "react";
import RowTable from "../components/rowTable/rowTable";

async function getTotales(id) {
  const { data } = await Axios.get(`/api/invest/totales/${id}`);
  return data;
}

export default function Home({ usuario }) {
  const [inv, setInv] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(1);
  const [load, setLoad] = useState(true);
  const [totales, setTotales] = useState([]);
  const [modalData, setModalData] = useState({
    fecha: "",
    entidad: "",
    empresa: "",
    retornoInteres: "",
    retornoCapital: "",
    capital: "",
    t_anual: "",
    periodo: "",
  });
  useEffect(() => {
    async function loadInvest() {
      try {
        const { data } = await Axios.get(`/api/invest?user=${usuario._id}`);
        // console.log(data);
        setInv(data);

        try {
          const Tot = await getTotales(usuario._id);
          setTotales(Tot);
          setLoad(false);
          // console.log(totales, "otales Demo");
        } catch (error) {}
      } catch (error) {
        console.log(error);
      }
    }

    loadInvest();
  }, [modal, usuario, load]);

  // const reducer = (accumulator, curr) => accumulator + curr,0;

  // console.log(
  const InversionTotal = totales
    .map(({ CapitalTotal }) => {
      return [CapitalTotal];
    })
    .reduce((accumulator, curr) => accumulator * 1 + curr * 1, 0 * 1);
  // "ales"
  // );

  // const totales

  return (
    <>
      <main className="main">
        <div className="resume_container">
          <div className="main_resume">
            <Card
              title={"Capital Invertido"}
              kpi={`${InversionTotal} S/.`}
              color={`rgb(214, 232, 245)`}
              fontColor={`rgb(40, 152, 233)`}
              classIcon={`fas fa-hand-holding-usd`}
            />
            {/* <Card
              title={"Interes Total"}
              kpi={"15,000 S/."}
              color={`rgb(254, 231, 218)`}
              fontColor={`rgb(239, 121, 46)`}
              classIcon={`fas fa-piggy-bank`}
            /> */}
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
          {/* <h1 className="main_title">Portafolio EH</h1> */}
          <div >
            <button
              className="add_investment"
              onClick={() => {
                setModal(true);
                setModalData({
                  fecha: "",
                  entidad: "",
                  empresa: "",
                  retornoInteres: "",
                  retornoCapital: "",
                  capital: "",
                  t_anual: "",
                  periodo: "",
                });
                setType(1);
              }}
            >
              Agregar Inversion
            </button>
            <div className="main_content">
              <TablePortafolio
                inv={inv}
                closeModal={setModal}
                setModalData={setModalData}
                setType={setType}
              />
              {/* <RowTable
                inv={inv}
                closeModal={setModal}
                setModalData={setModalData}
                setType={setType}
              /> */}
              <PieChart tot={totales} />
            </div>
          </div>
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
