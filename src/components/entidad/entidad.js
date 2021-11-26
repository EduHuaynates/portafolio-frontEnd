import "./entidad.css";

export default function Entidad({
  logo,
  empresa,
  tipoInv,
  barrera,
  contacto,
  notaria,
  firmadigital,
}) {
  return (
    <div className="entidad_container">
      <div className="logo_container">
        <img className="entidad_logo" src={logo} alt="" />
      </div>
      <div className="entidad_main">
        <div className="entidad_title">{empresa}</div>
        <div className="entidad_contact">
          <i className="fab fa-whatsapp"></i>
          {contacto.map((cel) => {
            return cel;
          })}
        </div>
        <div className="entidad_type">{tipoInv}</div>
        <div className="entidad_limit">
          <i className="fas fa-ban icon"></i>
          {barrera}
        </div>
        <div className="entidad_ubicacion">{notaria}</div>
        <div className="entidad_digital">{firmadigital}</div>
      </div>
    </div>
  );
}
