// STYLES
import "./App.css";

//  COMPONENT
import Error from "./components/error/Error";
// import NavBar from "./components/navBar/navBar";
import SideBar from "./components/sidebar/sidebar";

// VIEWS
import Dashboard from "./views/dashboard";
import Signup from "./views/signup";
import Login from "./views/login";
import Entidades from "./views/entidades";
import EntidadStats from "./views/entidadStats";
import EntidadMantein from "./views/entidadMantein";

import Axios from "axios";
import {
  setToken,
  removeToken,
  getToken,
  initAxiosInterceptors,
} from "./helpers/auth-helpers";
import React, { useState, useEffect } from "react";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
// import { useDispatch } from "react-redux";

initAxiosInterceptors();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, SetError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        setLoadingUser(false);
        return;
      }

      try {
        const { data: usuario } = await Axios.get("api/user/whoami");
        console.log(usuario, "userwhoami");
        setUsuario(usuario);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);

  async function login(username, password) {
    const { data } = await Axios.post("api/user/login", {
      username,
      password,
    });
    setUsuario(data.user);
    setToken(data.token);
  }

  async function signup(user) {
    const { data } = await Axios.post("api/user/register", user);
    console.log(data, "signup");
    setUsuario(data.user);
    setToken(data.token);
  }

  function logout() {
    setUsuario(null);
    removeToken();
  }

  function showError(message) {
    SetError(`${message}`);
  }

  function hideError() {
    SetError(null);
  }

  return (
    <Router>
      {/* <NavBar usuario={usuario} /> */}
      <Error message={error} hideError={hideError} />
      {usuario ? (
        <div className="LoginRoutesContainer">
          <SideBar />
          <LoginRoutes
            showError={showError}
            logout={logout}
            usuario={usuario}
          />
        </div>
      ) : (
        <LogoutRoutes login={login} signup={signup} showError={showError} />
      )}
    </Router>
  );

  function LogoutRoutes({ login, signup, showError }) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Login login={login} showError={showError} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup signup={signup} showError={showError} />}
        ></Route>
      </Routes>
    );
  }

  function LoginRoutes({ login, showError, logout, usuario }) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard usuario={usuario} />}></Route>
        <Route
          exact
          path="entidades"
          element={<Entidades usuario={usuario} />}
        ></Route>
        <Route
          exact
          path="mantein"
          element={<EntidadMantein usuario={usuario} />}
        ></Route>
        <Route
          exact
          path="entidades/:id"
          element={
            <EntidadStats usuario={usuario} match={useMatch("entidades/:id")} />
          }
        ></Route>
      </Routes>
    );
  }
}
