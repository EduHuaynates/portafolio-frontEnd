// STYLES
import "../styles/dashboard.css";

// COMPONENTS
import Card from "../components/cards/card";
import PaymentCalendar from "../components/calendar/calendar";
import PieChart from "../components/pieChart/pieChart";
import BarChart from "../components/barchart/barchart";
import ModInvest from "./modalViews/modInvest";
import Table2 from "../components/table/table2";

// HOOKS
import { useEffect, useState } from "react";

// UTILS
import { getTotales, loadInvest } from "../utils/apiCalls";

//LAYOUT
import { investForm } from "../layout/invest";

// async function getTotales(id) {
//   const { data } = await Axios.get(`/api/invest/totales/${id}`);
//   return data;
// }

export default function Dashboard({ usuario }) {
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
    schedule: [],
  });
  useEffect(() => {
    // async function loadInvest() {
    //   try {
    //     const { data } = await Axios.get(`/api/invest?user=${usuario._id}`);
    //     console.log(data, "Inversiones");
    //     setInv(data);
    //     try {
    //       const Tot = await getTotales(usuario._id);
    //       setTotales(Tot);
    //       setLoad(false);
    //       // console.log(totales, "otales Demo");
    //     } catch (error) {}
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // loadInvest();

    const inversionesAPI = Promise.all([
      loadInvest(usuario),
      getTotales(usuario._id),
    ]);

    inversionesAPI.then((values) => {
      // console.log(values, "values");
      const [invApi, totApi] = values;
      setInv(invApi);
      setTotales(totApi);
    });
    // const [invApi, totApi] = Promise.all([
    //   loadInvest(usuario),
    //   getTotales(usuario._id),
    // ]).then(() => {
    //   // console.log(totApi, "totApi");
    //   // console.log(invApi, "invApi");
    //   setInv(invApi);
    //   setTotales(totApi);
    //   setLoad(false);
    // });

    // const invApi = loadInvest(usuario);
    // const totApi = getTotales(usuario._id);
  }, [modal, usuario, load]);

  const InversionTotal = totales
    .map(({ CapitalTotal }) => {
      return [CapitalTotal];
    })
    .reduce((accumulator, curr) => accumulator * 1 + curr * 1, 0 * 1);

  const NroInversiones = inv.length;

  return (
    <>
      <main className="main">
        <div className="main_investments">
          <h2 className="main_user_welcome">Bienvenido {usuario.username} !</h2>
          <div className="main_content">
            <div className="resume_container">
              <div className="main_resume">
                <Card
                  title={"Capital Invertido"}
                  kpi={`${InversionTotal} S/.`}
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
                  kpi={NroInversiones}
                  color={`rgb(254, 247, 217)`}
                  fontColor={`rgb(234, 207, 52)`}
                  classIcon={`fas fa-chart-line`}
                />
              </div>
            </div>
            <PieChart tot={totales} />
            <PaymentCalendar paymentDays={inv} />

            <div className="main_table_wrapper">
              <div className="main_table_header">
                <p className="main_table_title"> Portafolio</p>
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
                      schedule: [],
                    });
                    setType(1);
                  }}
                >
                  Agregar Inversion
                </button>
              </div>
              <div className="main_table_body">
                <Table2
                  inv={inv}
                  closeModal={setModal}
                  setModalData={setModalData}
                  setType={setType}
                />
              </div>
            </div>
            <BarChart barChartData={inv} />
          </div>
        </div>
      </main>
      {modal && (
        <ModInvest
          usuario={usuario}
          modal={modal}
          closeModal={setModal}
          modalData={modalData}
          type={type}
          formLayout={investForm}
          layout={"invest"}
        />
      )}
    </>
  );
}
