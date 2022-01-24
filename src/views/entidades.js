// STYLESS
import "../styles/entidades.css";

// COMPONENTS
import Entidad from "../components/entidad/entidad";
import Skeleton from "../components/skeleton/skeleton";
import Select from "react-select";

// HOOKS
import { useEffect, useState } from "react";

// UTILS
import { getAllEntities } from "../utils/apiCalls";

// import Axios from "axios";

// async function getAllEntities() {
//   const { data: entidades } = await Axios.get("api/entitie/");
//   return entidades;
// }

export default function Entidades() {
  const [ent, setEnt] = useState([]);
  const [load, setLoad] = useState(true);
  const [filterEnt, setFilterEnt] = useState(ent);

  useEffect(() => {
    const entidadesAPI = Promise.all([getAllEntities()]);

    entidadesAPI.then((values) => {
      const [entAPI] = values;
      setEnt(entAPI);
      setFilterEnt(entAPI);
      setLoad(false);
    });
    // async function getEnts() {
    //   try {
    //     const entidades = await getAllEntities();
    //     setEnt(entidades);
    //     setFilterEnt(entidades);
    //     setLoad(false);
    //   } catch (error) {}
    // }
    // getEnts();
  }, []);

  const handleFilter = (value) => {
    value
      ? setFilterEnt(
          ent.filter((newEnt) => {
            return newEnt.TipoInversion === value.label;
          })
        )
      : setFilterEnt(ent);
    console.log(value, "filterValue");
  };

  return (
    <div className="main_entidades">
      <div className="entidadesFilter">
        <div className="singleFilterContainer">
          <p className="singleFilterTitle">Categorias de Inversion</p>
          <Select
            isClearable
            onChange={handleFilter}
            options={[
              {
                value: "Préstamos con garantía inmobiliaria",
                label: "Préstamos con garantía inmobiliaria",
              },
              {
                value: "Financiamiento para PYMES",
                label: "Financiamiento para PYMES",
              },
            ]}
          />
        </div>
        <div className="singleFilterContainer">
          <p className="singleFilterTitle">Categorias de Inversion</p>
          <Select
            options={[
              { value: "Prestamo Hipotecario", label: "Prestamo Hipotecario" },
            ]}
          />
        </div>
        <div className="singleFilterContainer">
          <p className="singleFilterTitle">Categorias de Inversion</p>
          <Select
            options={[
              { value: "Prestamo Hipotecario", label: "Prestamo Hipotecario" },
            ]}
          />
        </div>
        <div className="singleFilterContainer">
          <p className="singleFilterTitle">Categorias de Inversion</p>
          <Select
            options={[
              { value: "Prestamo Hipotecario", label: "Prestamo Hipotecario" },
            ]}
          />
        </div>
      </div>
      <div className="entidadesContainer">
        {load ? (
          <Skeleton type={""} />
        ) : (
          filterEnt.map((entidad, key) => {
            return <Entidad key={key} entidad={entidad} type={"V"} />;
          })
        )}
      </div>
    </div>
  );
}
