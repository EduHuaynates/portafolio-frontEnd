// import Card from "../components/cards/card";
//STYLES
import "../styles/entidadMantein.css";

//COMPONENTS
import NewProject from "../components/newProject/newProject";
import EntidadDisplay from "../components/entidad/entidadDisplay";
import EntidadEdit from "../components/entidad/entidadEdit";

//VIEWS
import ModProject from "./modalViews/modProject";

//HOOKS
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

//UTILS
import { getEntitieToOwner } from "../utils/apiCalls";
import { getProject } from "../utils/apiCalls/project.call";

//LAYOUT
import { projectForm } from "../layout/project";

export default function EntidadMantein({ usuario }) {
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [entidadRetrieved, setEntidadRetrieved] = useState(0);
  const [projectRetrieved, setProjectRetrieved] = useState(0);
  const [projects, setProjects] = useState([
    {
      empresa: "",
      retornoInteres: "",
      retornoCapital: "",
      t_anual: 0,
      periodo: 0,
      estado: true,
    },
  ]);
  const [entidad, setEntidad] = useState({
    Empresa: "",
    Logo: "",
    TipoInversion: "",
    Barrera: 0,
    Contacto: [{ name: "", telephone: "" }],
    Notaria: "",
    FirmaDigital: false,
    user: usuario._id,
  });

  const [modalData, setModalData] = useState({
    empresa: "",
    retornoInteres: "",
    retornoCapital: "",
    t_anual: "",
    periodo: "",
  });

  useEffect(() => {
    setLoad(true);
    const entidadRetrieved = Promise.resolve(getEntitieToOwner(usuario._id));
    entidadRetrieved
      .then((value) => {
        const entidadAPI = value;
        setEntidadRetrieved(entidadAPI.length);

        if (entidadAPI.length > 0) {
          console.log("trajo algo");
          setEntidad(entidadAPI[0]);
          setLoad(false);
          return entidadAPI[0];
        }
        return { _id: "" };
      })
      .then((entidadAPI) => {
        const getProjectsAPI = Promise.resolve(getProject(entidadAPI._id));
        getProjectsAPI.then((value) => {
          setProjectRetrieved(value.length);
          setProjects(value);
        });
      });
  }, [modal, entidadRetrieved]);

  return (
    <div className="entidadMantein_Container">
      {editMode ? (
        <div className="entidadMantein_Wrapper">
          <EntidadEdit
            usuario={usuario}
            setEditMode={setEditMode}
            entidad={entidad}
            setEntidad={setEntidad}
            entidadRetrieved={entidadRetrieved}
          />
        </div>
      ) : (
        <EntidadDisplay
          usuario={usuario}
          setEditMode={setEditMode}
          entidad={entidad}
          entidadRetrieved={entidadRetrieved}
        />
      )}

      <div className="entidadProjects_Wrapper">
        <button
          className="entidadProject_New"
          onClick={() => {
            setModal(true);
          }}
        >
          <span className="entidad_NewProject_icon">+</span>
          <p>Crear una nueva oportunidad de inversion</p>
        </button>

        {projectRetrieved > 0 ? (
          <div className="entidadProjects_active">
            <span> Proyectos Activos</span>
            <div className="entidadProject_Single">
              {projects.map((prj, key) => {
                // console.log(prj, "prj");
                return <NewProject mantein={true} project={prj} key={key} />;
              })}
              {/* <NewProject /> */}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="entidadProjects_inactive">
          {/* <ToggleSwitch /> */}
          {/* <NewProject /> */}
        </div>
      </div>
      <Toaster />
      {modal && entidadRetrieved > 0 && (
        <ModProject
          usuario={usuario}
          modal={modal}
          closeModal={setModal}
          modalData={modalData}
          type={1}
          formLayout={projectForm}
          entidad={entidad._id}
        />
      )}
    </div>
  );
}
