import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  sendEntitie,
  getEntitieToOwner,
  updateEntitie,
} from "../../utils/apiCalls";

import { notify } from "../../utils/notify";
import "./entidadEdit.css";

export default function EntidadEdit({
  usuario,
  setEditMode,
  entidad,
  setEntidad,
  entidadRetrieved,
}) {
  const [load, setLoad] = useState(false);
  const handleInputChange = (e) => {
    setEntidad({
      ...entidad,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setEntidad({
      ...entidad,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entidadRetrieved > 0) {
      const Promise = updateEntitie(entidad._id, entidad);
      notify(Promise, "Entidad Actualizada");
    } else {
      const Promise = sendEntitie(entidad);
      notify(Promise, "Entidad Creada");
    }
    setEditMode(false);
  };

  const handelArrayChange = (e, index, name) => {
    const contactToEdit = [...entidad.Contacto];
    contactToEdit[index][name] = e.target.value;
    setEntidad({
      ...entidad,
      Contacto: [...contactToEdit],
    });
  };

  const handleNewInput = (index) => {
    setEntidad({
      ...entidad,
      Contacto: [].concat(
        [...entidad.Contacto].slice(0, index + 1),
        {
          name: "",
          telephone: "",
        },
        [...entidad.Contacto].slice(index + 1, entidad.Contacto.length)
      ),
    });
  };

  const handleDeleteInput = (index) => {
    setEntidad({
      ...entidad,
      Contacto: [].concat(
        [...entidad.Contacto].slice(0, index),
        [...entidad.Contacto].slice(index + 1, entidad.Contacto.length)
      ),
    });
  };
  return (
    <>
      <>
        {entidadRetrieved > 0 ? (
          <figure className="entidadMantein_Logo_Container">
            {entidad.Logo ? (
              <img className="entidadMantein_Logo" src={entidad.Logo} />
            ) : (
              <img
                className="entidadMantein_Logo"
                src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
              />
            )}
          </figure>
        ) : (
          <p className="modal_title"> Ingresa datos de empresa</p>
        )}
        <form className="authForm" onSubmit={handleSubmit}>
          <span className="inputTitle"> Nombre :</span>
          <input
            name="Empresa"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            required
            value={entidad.Empresa}
          />
          <span className="inputTitle"> Logo :</span>
          <input
            name="Logo"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            required
            value={entidad.Logo}
          />
          <span className="inputTitle"> Tipo Inversion :</span>
          <input
            name="TipoInversion"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            required
            value={entidad.TipoInversion}
          />
          <span className="inputTitle"> Barrera de Entrada :</span>
          <input
            name="Barrera"
            className="modalInput"
            onChange={handleInputChange}
            type="number"
            required
            value={entidad.Barrera}
          />
          <span className="inputTitle"> Contacto :</span>
          {entidad.Contacto.map((contact, ind) => {
            // console.log(contact, "contact");
            return (
              <div key={ind} className="inputAsArrayContainer">
                <input
                  //   key={ind}
                  name="Contacto"
                  className="modalInput"
                  onChange={(e) => {
                    handelArrayChange(e, ind, "name");
                  }}
                  type="text"
                  value={contact.name}
                />
                <input
                  name="Contacto"
                  className="modalInput"
                  onChange={(e) => {
                    handelArrayChange(e, ind, "telephone");
                  }}
                  type="text"
                  value={contact.telephone}
                />
                <button
                  className="btnAddNewInput"
                  onClick={() => handleNewInput(ind)}
                >
                  +
                </button>
                {ind == 0 ? (
                  <button
                    className="btnAddNewInput"
                    onClick={() => handleDeleteInput(ind)}
                    // style={{ display: "none" }}
                    disabled
                  >
                    -
                  </button>
                ) : (
                  <button
                    className="btnAddNewInput"
                    onClick={() => handleDeleteInput(ind)}
                  >
                    -
                  </button>
                )}
              </div>
            );
          })}
          <span className="inputTitle"> Notaria :</span>
          <input
            name="Notaria"
            className="modalInput"
            onChange={handleInputChange}
            type="text"
            // required
            value={entidad.Notaria}
          />
          <span className="inputTitle"> Firma Digital :</span>
          <input
            name="FirmaDigital"
            className="modalInput"
            onChange={handleCheckChange}
            type="checkbox"
            checked={entidad.FirmaDigital}
          />
          {entidadRetrieved > 0 ? (
            <button className="btnSendEntitie" type="submit">
              Actualizar
            </button>
          ) : (
            <button className="btnSendEntitie" type="submit">
              Guardar
            </button>
          )}
        </form>
      </>

      <Toaster />
    </>
  );
}
