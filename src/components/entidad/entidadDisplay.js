//STYLES
import "./entidadDisplay.css";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function EntidadEdit({
  usuario,
  setEditMode,
  entidad,
  entidadRetrieved,
}) {
  const [load, setLoad] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      <div className="entidadMantein_Wrapper">
        <div className="editBtnContainer">
          <button className="editBtn" onClick={handleEdit}>
            {" "}
            Edit{" "}
          </button>
        </div>
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
        <div className="entidadDisplayContainer">
          <span className="entidadDisplayTitle"> Nombre :</span>
          <p className="entidadDisplayDesc">{entidad.Empresa}</p>

          <span className="entidadDisplayTitle"> Logo :</span>
          <p className="entidadDisplayDesc">{entidad.Logo}</p>

          <span className="entidadDisplayTitle"> Tipo Inversion :</span>
          <p className="entidadDisplayDesc">{entidad.TipoInversion}</p>

          <span className="entidadDisplayTitle"> Barrera de Entrada :</span>
          <p className="entidadDisplayDesc">{entidad.Barrera}</p>

          <span className="entidadDisplayTitle"> Contacto :</span>
          {entidad.Contacto.map((contact, ind) => {
            return (
              <div key={ind} className="entidadDisplayContact">
                <p className="entidadDisplayDesc">{contact.name} - </p>
                <p className="entidadDisplayDesc">{contact.telephone}</p>
              </div>
            );
          })}
          <span className="entidadDisplayTitle"> Notaria :</span>
          <p className="entidadDisplayDesc">{entidad.Notaria}</p>
          <span className="entidadDisplayTitle"> Firma Digital :</span>
          <input type="checkbox" disabled checked={entidad.FirmaDigital} />
        </div>
      </div>

      <Toaster />
    </>
  );
}
