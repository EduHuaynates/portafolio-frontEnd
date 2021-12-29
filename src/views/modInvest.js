import { useState, useEffect } from "react";
import "../styles/form.css";
import "../styles/modal.css";
import { Toaster, toast } from "react-hot-toast";
import Axios from "axios";
import scheDulePayment from "../utils/schedulePayment";
import ScheduleTable from "../components/table/schedule";

export default function AddInvest({ usuario, closeModal, modalData, type }) {
  const [sendData, setSendData] = useState(false);
  const [sendDataSchedule, setSendDataSchedule] = useState(false);
  const [invest, setInvest] = useState({
    ...modalData,
    retornoCapital: "Mensual",
    retornoInteres: "Mensual",
    // Cuota: 0,
    // CapitalRetornado: 0,
    // InteresRetornado: 0,
    user: usuario._id,
  });

  useEffect(() => {
    if (sendData) {
      if (type === 1) {
        const promiseLogin = Axios.post("/api/invest/", invest);
        notify(promiseLogin);
      } else if (type === 2) {
        const { id_invest, ...others } = invest;
        const promiseLogin = Axios.put(`/api/invest/${id_invest}`, {
          ...others,
        });
        notify(promiseLogin);
      }
    }
  }, [sendData]);

  const handleInputChange = (e) => {
    setInvest({
      ...invest,
      [e.target.name]: e.target.value,
    });
  };

  const notify = (promise) => {
    toast.promise(promise, {
      loading: "Loading",
      success: (data) =>
        `${type === 1 ? `Inversion Agregada` : `Inversion Actualizada`} `,
      // error: (err) => `${err.toString()}`,
    });
  };

  const getSchedule = () => {
    let scheduleCreated = [];
    try {
      scheduleCreated = scheDulePayment(
        invest.capital,
        invest.periodo,
        invest.t_anual,
        invest.retornoInteres,
        invest.retornoCapital,
        invest.fecha
      );
    } catch (err) {
      toast.error(err.message);
    }

    setInvest({
      ...invest,
      schedule: scheduleCreated,
    });

    setSendDataSchedule(() => !sendDataSchedule);
  };

  function handleSubmit(e) {
    e.preventDefault();
    getSchedule();
    setSendData(() => !sendData);
  }

  return (
    <div className="modal_invest_background">
      <div className="modal_invest_container">
        <div className="modal_header">
          {type === 2 ? (
            <div className="modal_title"> Actualiza tu inversión</div>
          ) : (
            <div className="modal_title"> Agregar nueva inversión</div>
          )}

          <div className="modal_close_container">
            <button onClick={() => closeModal(false)} className="close_button">
              <i className="fas fa-window-close"></i>
            </button>
          </div>
        </div>
        <div className="modal_main_content">
          <form onSubmit={handleSubmit} className="authForm modalForm">
            <span className="inputTitle"> Fecha : </span>
            <input
              name="fecha"
              className="modalInput"
              onChange={handleInputChange}
              type="date"
              placeholder="Fecha"
              value={invest.fecha}
              required
            />
            <span className="inputTitle"> Entidad : </span>
            <input
              name="entidad"
              className="modalInput"
              onChange={handleInputChange}
              type="text"
              placeholder="Entidad"
              value={invest.entidad}
              required
            />
            <span className="inputTitle"> Empresa : </span>
            <input
              name="empresa"
              className="modalInput"
              onChange={handleInputChange}
              type="text"
              placeholder="Empresa"
              value={invest.empresa}
            />
            <span className="inputTitle"> Retorno Interes : </span>
            <select
              onChange={handleInputChange}
              className="modalInput modalSelect"
              name="retornoInteres"
              // defaultValue={"Mensual"}
              required
              value={invest.retornoInteres}
            >
              {/* <option value=""></option> */}
              <option value="Mensual">Mensual</option>
              <option value="Final">Final</option>
            </select>
            <span className="inputTitle"> Retorno Capital : </span>
            <select
              onChange={handleInputChange}
              className="modalInput modalSelect"
              name="retornoCapital"
              // defaultValue={"Mensual"}
              required
              value={invest.retornoCapital}
            >
              <option value="Mensual">Mensual</option>
              <option value="Final">Final</option>
            </select>
            <span className="inputTitle"> Capital : </span>
            <input
              name="capital"
              className="modalInput"
              onChange={handleInputChange}
              type="number"
              placeholder="Capital"
              required
              value={invest.capital}
            />
            <span className="inputTitle"> Tasa Anual : </span>
            <input
              name="t_anual"
              className="modalInput"
              onChange={handleInputChange}
              type="text"
              placeholder="Tasa Anual"
              required
              value={invest.t_anual}
            />
            <span className="inputTitle"> Periodo : </span>
            <input
              name="periodo"
              className="modalInput"
              onChange={handleInputChange}
              type="number"
              required
              placeholder="Periodo"
              value={invest.periodo}
            />
            <div className="btn_container">
              {type === 2 ? (
                <button type="submit" className="modal_add_invest">
                  Update
                </button>
              ) : (
                <button type="submit" className="modal_add_invest">
                  Guardar
                </button>
              )}
            </div>
          </form>
          <div className="investment_schedule_container">
            <div className="schedule_header_container">
              <button
                type=""
                className="add_investment"
                onClick={() => getSchedule()}
              >
                <i className="far fa-calendar-alt" /> Ver Cronograma
              </button>
            </div>
            <ScheduleTable scheduleData={invest.schedule} />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
