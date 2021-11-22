import Axios from "axios";
const TOKEN_KEY = "BOK TOKEN";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // console.log(error);
      // return Promise.reject(error);
      if (error.response.status === 401) {
        removeToken();
        window.location("./login");
      } else {
        // console.log(error.response.data, "autherror");
        return Promise.reject(error);
      }
    }
  );
}
