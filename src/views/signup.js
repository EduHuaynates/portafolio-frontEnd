import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";
// import Error from "../components/error/Error";
import { Toaster, toast } from "react-hot-toast";
// import Main from '../Componentes/Main';
// import imagenSignup from '../imagenes/signup.png';

export default function Signup({ signup, mostrarError }) {
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  const notify = (promise) => {
    toast.promise(promise, {
      loading: "Loading",
      success: (data) => `Usuario creado exitosamente`,
      error: (err) => `${err.response.data.message}`,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const promiseSingUp = signup(usuario);
    notify(promiseSingUp);
    // try {
    //   await signup(usuario);
    // } catch (error) {
    //   notify(error.response.data.message);
    // }
  }

  return (
    // <Main center={true}>
    <div className="authPage">
      {/* <img src={imagenSignup} alt="" className="Signup__img" /> */}
      <div className="authContainer">
        <h5 className="authTitle">Clontagram</h5>
        <p className="authp">Regístrate para que ver tus inversiones</p>
        <form className="authForm" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <i className="fas fa-user icon"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="authInput"
              required
              minLength="3"
              maxLength="100"
              onChange={handleInputChange}
              value={usuario.username}
            />
          </div>
          <div className="inputContainer">
            <i className="fas fa-envelope icon"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="authInput"
              required
              onChange={handleInputChange}
              value={usuario.email}
            />
          </div>
          <div className="inputContainer">
            <i className="fas fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="authInput"
              required
              onChange={handleInputChange}
              value={usuario.password}
            />
          </div>
          <button className="authSubmit" type="submit">
            Sign up
          </button>
          <p className="authp">
            Ya tienes cuenta? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
      <Toaster position="top-left" />
    </div>
  );
}
