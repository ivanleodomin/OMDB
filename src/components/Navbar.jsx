/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/user";
import useForm from "../hooks/useForm";
import "../styles/nav.css";

function Login() {
  const [isActive, setIsActive] = React.useState(false);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const busqueda = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${busqueda.data}/1`);
  };

  const handleClick = () => {
    axios.get("/api/auth/logout").then(() => {
      dispatch(setLogin(null));
      history.push("/home");
    });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          onClick={() => setIsActive(!isActive)}
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarOMDB"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarOMDB" className={`navbar-menu ${isActive && "is-active"}`}>
        <div className="navbar-start">
          <Link to="/home" className="navbar-item">
            Home
          </Link>
          <Link to="/users" className="navbar-item">
            Users
          </Link>
          {user?.id && (
            <Link to={`/users/${user.id}`} className="navbar-item">
              Me
            </Link>
          )}
          <div>
            <form onSubmit={handleSubmit}>
              <input
                {...busqueda}
                className="input is-rounded mt-3 ml-2 mb-2"
                type="text"
                placeholder="search movies"
              />
            </form>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user?.id ? (
                <Link
                  to="/login"
                  onClick={handleClick}
                  className="button is-primary"
                >
                  <strong>logout</strong>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login" className="button is-light">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Login;
