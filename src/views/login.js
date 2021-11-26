import "../styles/form.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import img from "../images/investment.jpg";

export default function Login({ showError, login }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const notify = (promise) => {
    toast.promise(promise, {
      loading: "Loading",
      success: (data) => `Usuario creado exitosamente`,
      error: (err) => `${err.response.data.message}`,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const promiseLogin = login(user.username, user.password);
    notify(promiseLogin);

    // try {
    //   await login(user.username, user.password);
    // } catch (error) {
    //     console.error(error)
    // //   showError(error.response.data.message);
    // }
  }
  return (
    <div className="authPage">
      <div className="authContainer">
        {/* <div className="authImageContainer">
          <img src={img} alt="logo" />
        </div> */}
        {/* <div className="authMainContainer"> */}
          <h5 className="authTitle"> Login to Portafolio</h5>
          <form className="authForm" onSubmit={handleSubmit}>
            <div className="inputContainer">
              <i className="fas fa-user icon"></i>
              <input
                name="username"
                className="authInput"
                onChange={handleInputChange}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="inputContainer">
              <i className="fas fa-lock icon"></i>
              <input
                name="password"
                className="authInput"
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
              />
            </div>
            <button className="authSubmit" type="submit">
              Login
            </button>
          </form>

          <p className="authp">
            Dont you have an account? <Link to="/signup">Sign Up</Link> Now
          </p>
          <p className="authp"> Create an account </p>
        {/* </div> */}
      </div>
      <Toaster position="top-left" />
    </div>
  );
}
