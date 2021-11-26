import { useState } from "react";
import "../styles/form.css";
import "../styles/modal.css";
import { Toaster, toast } from "react-hot-toast";
import Axios from "axios";

export default function AddInvest({ usuario, closeModal, modalData, type }) {
  // console.log(modalData, "modalData");
  const [invest, setInvest] = useState({
    ...modalData,
    user: usuario._id,
  });

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
      error: (err) => `${err.response.data.message}`,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
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
            name="empresa"
            className="authInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Empresa"
            value={invest.empresa}
          />
          <input
            name="capital"
            className="authInput"
            onChange={handleInputChange}
            type="number"
            placeholder="Capital"
            value={invest.capital}
          />
          <input
            name="t_anual"
            className="authInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Tasa Anual"
            value={invest.t_anual}
          />
          <input
            name="periodo"
            className="authInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Periodo"
            value={invest.periodo}
          />
          <input
            name="status"
            className="authInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Status"
            value={invest.status}
          />
          <input
            name="i_mensual"
            className="authInput"
            onChange={handleInputChange}
            type="text"
            placeholder="Interes Mensual"
            value={invest.i_mensual}
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
