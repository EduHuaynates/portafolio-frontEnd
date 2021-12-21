import { useState, useEffect } from "react";
import "../styles/form.css";
import "../styles/modal.css";
import { Toaster, toast } from "react-hot-toast";
import Axios from "axios";
import scheDulePayment from "../utils/schedulePayment";

export default function AddInvest({ usuario, closeModal, modalData, type }) {
  const [sendData, setSendData] = useState(false);
  const [invest, setInvest] = useState({
    ...modalData,
    schedule: [],
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
      // error: (err) => `${err.response.data.message}`,
      // error: (err) => `Actualiza tu inversion`,
    });
  };

  const getSchedule = () => {
    setInvest({
      ...invest,
      schedule: scheDulePayment(
        invest.capital,
        invest.periodo,
        invest.t_anual,
        invest.retornoInteres,
        invest.retornoCapital,
        invest.fecha
      ),
    });
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
          <div className="modal_title"> Agregar nueva inversion</div>
          <div className="modal_close_container">
            <button onClick={() => closeModal(false)} className="close_button">
              <i className="fas fa-window-close"></i>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="authForm modalForm">
          <input
            name="fecha"
            className="modalInput"
            onChange={handleInputChange}
            type="date"
            placeholder="Fecha"
            value={invest.fecha}
            required
          />
          <input
            name="entidad"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Entidad"
            value={invest.entidad}
          />
          <input
            name="empresa"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Empresa"
            value={invest.empresa}
          />
          <select
            onChange={handleInputChange}
            className="modalInput modalSelect"
            name="retornoInteres"
            defaultValue={"Mensual"}
            value={invest.retornoInteres}
          >
            <option value="Mensual">Mensual</option>
            <option value="Final">Final</option>
          </select>
          <select
            onChange={handleInputChange}
            className="modalInput modalSelect"
            name="retornoCapital"
            defaultValue={"Mensual"}
            value={invest.retornoCapital}
          >
            <option value="Mensual">Mensual</option>
            <option value="Final">Final</option>
          </select>
          <input
            name="capital"
            className="modalInput"
            onChange={handleInputChange}
            type="number"
            placeholder="Capital"
            value={invest.capital}
          />
          <input
            name="t_anual"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Tasa Anual"
            value={invest.t_anual}
          />
          <input
            name="periodo"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
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
      </div>
      <Toaster />
    </div>
  );
}
