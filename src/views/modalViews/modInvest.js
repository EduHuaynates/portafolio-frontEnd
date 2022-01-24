//STYLES
import "../../styles/form.css";
import "../../styles/modal.css";

//HOOKS
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

//COMPONENTS
import ScheduleTable from "../../components/table/schedule";

//UTILS
import scheDulePayment from "../../utils/schedulePayment";
import Axios from "axios";
// import { investForm } from "../layout/invest";

export default function AddInvest({
  usuario,
  modal,
  closeModal,
  modalData,
  type,
  formLayout,
  layout,
}) {
  const [sendData, setSendData] = useState(false);
  const [sendDataSchedule, setSendDataSchedule] = useState(false);
  const [invest, setInvest] = useState({
    ...modalData,
    retornoCapital: "Mensual",
    retornoInteres: "Mensual",
    user: usuario._id,
  });

  console.log(modalData, "modalData");
  console.log(invest, "invest");

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
    <div
      className={
        modal ? "modal_invest_background_showed" : "modal_invest_background"
      }
    >
      <div className="modal_invest_container">
        <div className = "modal_header">
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
            {formLayout.map((item) => {
              return (
                <>
                  <span className="inputTitle"> {item.label} </span>
                  {item.object === "input" ? (
                    <input
                      name={item.name}
                      className={item.className}
                      onChange={handleInputChange}
                      type={item.type}
                      placeholder={item.placeholder}
                      value={invest[item.name]}
                      required
                    />
                  ) : (
                    <select
                      onChange={handleInputChange}
                      name={item.name}
                      className={item.className}
                      required
                      value={invest[item.name]}
                    >
                      <option value="Mensual">Mensual</option>
                      <option value="Final">Final</option>
                    </select>
                  )}
                </>
              );
            })}

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
