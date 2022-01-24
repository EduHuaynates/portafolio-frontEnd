import Axios from "axios";

// import {
//   setToken,
//   removeToken,
//   getToken,
//   initAxiosInterceptors,
// } from "../helpers/auth-helpers";

/*  ************* Portafolio del usuario **************  */
async function getTotales(id) {
  try {
    return Axios.get(`/api/invest/totales/${id}`).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}

async function loadInvest(usuario) {
  try {
    return Axios.get(`/api/invest?user=${usuario._id}`).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}

/*  ************* Entidades para Invertir **************  */

async function getAllEntities() {
  return Axios.get("api/entitie/").then((res) => res.data);
}

async function getUnicaEntidad(id) {
  return Axios.get(`/api/entitie/${id}`).then((res) => res.data);
}

async function getSimilarEntidad(TipoInversion, id) {
  return Axios.get(`/api/entitie/similar/${id}`, {
    params: { TipoInversion },
  }).then((res) => res.data);
}

/*  ************* Post and Comments **************  */
async function getPosts(Entitie) {
  return Axios.get(`/api/post/${Entitie}`, {
    params: { Entitie },
  }).then((res) => res.data);
}

async function sendPostAPI(message, entID, user_id) {
  return Axios.post(`/api/post/`, {
    Message: message,
    Entitie: entID,
    User: user_id,
  }).then((res) => res.data);
  // notify(Promise);
  // setCargarPost(() => cargarPost + 1);
}

/*  ************* Mantenimiento Entidades **************  */
async function sendEntitie(entitie) {
  return Axios.post("/api/entitie/", entitie);
}

async function updateEntitie(id, entitie) {
  return Axios.put(`/api/entitie/${id}`, entitie);
}

async function getEntitieToOwner(userId) {
  return Axios.get(`/api/entitie/mantein/${userId}`).then((res) => res.data);
}

// async function login(username, password) {
//   try {
//     return Axios.post("api/user/login", {
//       username,
//       password,
//     }).then((res) => {
//       return res.data;
//     });
//   } catch (error) {}
//   //   setUsuario(data.user);
//   //   setToken(data.token);
//   //   const { data } = await Axios.post("api/user/login", {
//   //     username,
//   //     password,
//   //   });
// }

export {
  getTotales,
  loadInvest,
  getAllEntities,
  getUnicaEntidad,
  getSimilarEntidad,
  getPosts,
  sendPostAPI,
  sendEntitie,
  updateEntitie,
  getEntitieToOwner,
};
