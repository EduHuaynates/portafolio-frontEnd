import "../styles/entidadStats.css";
import { useEffect, useState } from "react";
import EntidadAllInfo from "../components/entidad/entidadAllInfo";
import Post from "../components/post/post";
import Card from "../components/cards/card";
import SimilarEntidad from "../components/entidad/similarEnts";
// import { useLocation } from "react-router-dom";
import Axios from "axios";

async function getUnicaEntidad(id) {
  const { data } = await Axios.get(`/api/entitie/${id}`);
  return data;
}

async function getSimilarEntidad(TipoInversion, id) {
  const { data } = await Axios.get(`/api/entitie/similar/${id}`, {
    params: { TipoInversion },
  });
  return data;
}

export default function EntidadStats({ match }) {
  const [singleEnt, setSingleEnt] = useState(null);
  const [similarEnt, setSimilarEnt] = useState(null);
  const [load, setLoad] = useState(true);
  const entID = match.params.id;
  // console.log(entID, "id");

  useEffect(() => {
    const getEntidad = async () => {
      try {
        const entidadNueva = await getUnicaEntidad(entID);
        setSingleEnt(entidadNueva);
        try {
          const similarEntidad = await getSimilarEntidad(
            entidadNueva.TipoInversion,
            entID
          );
          console.log(entidadNueva.TipoInversion, "tipoinv");
          console.log(similarEntidad, "similar");
          setSimilarEnt(similarEntidad);
          setLoad(false);
        } catch (error) {
          console.log(error, "errortipo");
        }
        // console.log(entidadNueva, "entidad Nueva");
      } catch (error) {
        console.log(error);
      }
    };

    getEntidad();
  }, [entID]);

  // console.log(similarEnt,'similar');

  return (
    <div className="entidadContainer">
      <aside className="entidadInfoContainer">
        {load ? (
          <div className=""></div>
        ) : (
          <EntidadAllInfo singleEnt={singleEnt} />
        )}
      </aside>
      <main className="entidadStatsContainer">
        <div className="entidadkpisContainer">
          <p className="entidadKpisTitle"> INDICADORES </p>
          <div className="entidad_stats_Kpis">
            <Card
              title={"# Inversores"}
              kpi={"35"}
              color={`rgb(214, 232, 245)`}
              fontColor={`rgb(40, 152, 233)`}
              classIcon={`fas fa-users`}
            />
            <Card
              title={"# Inversiones"}
              kpi={"53"}
              color={`rgb(254, 231, 218)`}
              fontColor={`rgb(239, 121, 46)`}
              classIcon={`fas fa-coins`}
            />
            <Card
              title={"Valoracion"}
              kpi={"4.6"}
              color={`rgb(240, 221, 255)`}
              fontColor={`rgb(141, 29, 235)`}
              classIcon={`fas fa-star`}
            />
            <Card
              title={"# Dias Atraso Promedio"}
              kpi={"12"}
              color={`rgb(254, 247, 217)`}
              fontColor={`rgb(234, 207, 52)`}
              classIcon={`fas fa-clock`}
            />
          </div>
        </div>

        <div className="entidad_comments_container">
          <p className="entidadCommentTitle">CONSULTAS</p>
          <div className="entidad_comments">
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </main>
      <aside>
        <div>Proyectos Nuevos</div>

        {load ? (
          <div className=""></div>
        ) : (
          <div className="entidad_similar_container">
            <p className="entidad_similar_titulo">ENTIDADES SIMILARES</p>

            <SimilarEntidad similarEnts={similarEnt} />
          </div>
        )}
      </aside>
    </div>
  );
}
