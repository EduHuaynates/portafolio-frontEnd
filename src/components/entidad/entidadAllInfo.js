import "./entidadAllInfo.css";

export default function EntidadAllInfo({ singleEnt }) {
  // console.log(singleEnt, "allfino");
  return (
    <div className="aside_entidad_info_container">
      <div className="aside_logo_container">
        <img className="aside_logo_entidad" src={singleEnt.Logo} alt="" />
      </div>
      <p className="aside_entidad_title">{singleEnt.Empresa}</p>
      <div className="aside_entidad_feature">
        <p className="aside_entidad_subtitle">Tipo Inversion : </p>{" "}
        {singleEnt.TipoInversion}
      </div>
      <div className="aside_entidad_feature">
        <p className="aside_entidad_subtitle">
          <i className="fas fa-ban icon"></i>Barrera de Entrada :
        </p>
        {singleEnt.Barrera}
      </div>

      {singleEnt.Contacto.length > 0 ? (
        <div className="aside_entidad_feature">
          <p className="aside_entidad_subtitle">Contacto : </p>
          <div className="aside_entidad_nested nested_contact">
            {singleEnt.Contacto.map((c, key) => {
              return (
                <>
                  <div
                    id={key}
                    className="aside_entidad_feature feature_contact"
                  >
                    <p className="aside_entidad_subtitle">
                      <i className="fas fa-user icon"></i>Persona :
                    </p>
                    {c.name}
                  </div>
                  <div id={key} className="aside_entidad_feature feature_contact">
                    <p className="aside_entidad_subtitle">
                      <i className="fab fa-whatsapp icon"></i>Telefono :
                    </p>
                    <a
                      className="link"
                      href={`https://wa.me/51${c.telephone}`}
                      target="_blank"
                    >
                      {c.telephone}
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      {singleEnt.Notaria ? (
        <div className="aside_entidad_feature">
          <p className="aside_entidad_subtitle">Notaria : </p>
          {singleEnt.Notaria}
        </div>
      ) : (
        ""
      )}
      <div className="aside_entidad_feature">
        <p className="aside_entidad_subtitle">
          <i className="fas fa-signature icon"></i>
          Firma Digital :
        </p>
        No
      </div>
    </div>
  );
}
