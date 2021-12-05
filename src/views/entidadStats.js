import "../styles/entidadStats.css";
import { useEffect, useState } from "react";
import EntidadAllInfo from "../components/entidad/entidadAllInfo";
import Post from "../components/post/post";
import Card from "../components/cards/card";
import SimilarEntidad from "../components/entidad/similarEnts";
import { Toaster, toast } from "react-hot-toast";
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

async function getPosts(Entitie) {
  const { data } = await Axios.get(`/api/post/${Entitie}`, {
    params: { Entitie },
  });
  return data;
}

export default function EntidadStats({ match, usuario }) {
  const [singleEnt, setSingleEnt] = useState(null);
  const [similarEnt, setSimilarEnt] = useState(null);
  const [cargarPost, setCargarPost] = useState(0);
  const [load, setLoad] = useState(true);
  const [post, setPost] = useState([]);
  const entID = match.params.id;

  const notify = (promise) => {
    toast.promise(promise, {
      loading: "Loading",
      success: (data) => `Post Creado`,
      error: (err) => `${err.response.data.message}`,
    });
  };

  async function sendPost(message) {
    const Promise = Axios.post(`/api/post/`, {
      Message: message,
      Entitie: entID,
      User: usuario._id,
    });
    notify(Promise);
    setCargarPost(() => cargarPost + 1);
  }

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
          setSimilarEnt(similarEntidad);

          try {
            const postFeed = await getPosts(entID);
            setPost(postFeed);
            setLoad(false);
          } catch (error) {
            console.log(error, "Error Post Feed");
          }
        } catch (error) {
          console.log(error, "errortipo");
        }
        // console.log(entidadNueva, "entidad Nueva");
      } catch (error) {
        console.log(error);
      }
    };

    getEntidad();
  }, [entID, cargarPost]);

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
            <Post type={"NEW"} sendPost={sendPost} setLoad={setLoad} />

            {load
              ? ""
              : post.map((sp, key) => {
                  return <Post post={sp} key={key} />;
                })}
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
      <Toaster />
    </div>
  );
}
