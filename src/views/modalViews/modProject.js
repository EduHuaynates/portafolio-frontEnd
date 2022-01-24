//STYLES
import "../../styles/form.css";
import "../../styles/modal.css";

//HOOKS
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

//UTILS
import { getProject, sendProject } from "../../utils/apiCalls/project.call";
import { notify } from "../../utils/notify";
// import Axios from "axios";
// import { investForm } from "../layout/project";

export default function AddProject({
  usuario,
  //   entitie,
  modal,
  closeModal,
  modalData,
  type,
  formLayout,
  entidad
}) {
  const [sendData, setSendData] = useState(false);
  const [project, setProject] = useState({
    ...modalData,
    retornoCapital: "Mensual",
    retornoInteres: "Mensual",
    // user: usuario._id,
    entitie: entidad
  });

  useEffect(() => {
    if (sendData) {
      if (type === 1) {
        //create
        const promiseProject = sendProject(project);
        // console.log(promiseProject, "promiseProject");
        notify(promiseProject, "Proyecto Agregado");
      } else if (type === 2) {
        //update
        // const { id_invest, ...others } = invest;
        // const promiseLogin = Axios.put(`/api/invest/${id_invest}`, {
        //   ...others,
        // });
        // notify(promiseLogin);
      }
    }
  }, [sendData]);

  const handleInputChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSendData(() => !sendData);
    // setSendData(true);
    // setSendData(false);
    // setSendData(a);
  }

  return (
    <div
      className={
        modal ? "modal_invest_background_showed" : "modal_invest_background"
      }
    >
      <div className="modal_invest_container">
        <div className="modal_header">
          {type === 2 ? (
            <div className="modal_title"> Actualiza tu proyecto</div>
          ) : (
            <div className="modal_title"> Agregar nueva proyecto</div>
          )}

          <div className="modal_close_container">
            <button onClick={() => closeModal(false)} className="close_button">
              <i className="fas fa-window-close"></i>
            </button>
          </div>
        </div>
        <div className="modal_main_content">
          <form onSubmit={handleSubmit} className="authForm modalForm">
            {formLayout.map((item,key) => {
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
                      value={project[item.name]}
                      required
                    />
                  ) : (
                    <select
                      onChange={handleInputChange}
                      name={item.name}
                      className={item.className}
                      required
                      value={project[item.name]}
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
        </div>
      </div>
      <Toaster />
    </div>
  );
}
