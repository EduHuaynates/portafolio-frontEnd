import Axios from "axios";

async function getProject(entitiId) {
  try {
    return Axios.get(`/api/project/${entitiId}`).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}

async function sendProject(projectBody) {
  return Axios.post(`/api/project/`, projectBody).then((res) => res.data);
}

async function updateProject(projectId, updateBody) {
  return Axios.put(`/api/project/${projectId}`, updateBody).then(
    (res) => res.data
  );
}

export { getProject, sendProject, updateProject };
