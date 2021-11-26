import { useEffect, useState } from "react";
import Axios from "axios";
import Entidad from "../components/entidad/entidad";
import "../styles/entidades.css";

export default function Entidades() {
  const [ent, setEnt] = useState([]);

  useEffect(() => {
    async function getEnts() {
      const { data } = await Axios.get("api/entitie/");
      // console.log(data, "Entidades");
      // console.log(
      //   data.map((e) => e.Empresa),
      //   "Entidades"
      // );
      // console.log(typeof [data], "tipo entidad");
      setEnt(data);
    }
    getEnts();
  }, []);

  //   console.log(ent[0], "entState");

  return (
    <div className="main_entidades">
      <div className="entidadesContainer">
        {ent.map((e, key) => {
          return (
            <Entidad
              logo={e.Logo}
              empresa={e.Empresa}
              tipoInv={e.TipoInversion}
              barrera={e.Barrera}
              contacto={e.Contacto}
              notaria={e.Notaria}
              firmadigital={e.Firmadigital}
            />
          );
        })}
      </div>
    </div>
  );
}
