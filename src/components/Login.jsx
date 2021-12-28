import axios from "axios";
import React from "react";
import useForm from "../hooks/useForm";
import "../styles/forms.css";
import { useHistory, Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/user";

export default function Login() {
  const email = useForm();
  const password = useForm();

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/login", {
        email: email.data,
        password: password.data,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch(setLogin(data));
        history.push("/home");
      })
      .catch(() => alert("Credenciales incorrectas"));
  };
  return (
    <>
      <h1 id="title-form" className="title is-1 mb-6">
        OMDB PROYECT
      </h1>
      <div className="div-form">
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label>email</label>
            <input
              {...email}
              name="email"
              className="input is-primary"
              type="text"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label>password</label>
            <input
              {...password}
              className="input is-primary"
              type="text"
              placeholder="password"
              name="email"
            />
          </div>
          <div className="has-text-centered">
            <button type="submit" className="button is-success mt-4 mb-6">
              send
            </button>
            <Link to="/register" className="tag is-medium ml-3 mt-4 mb-6">¿no tenes cuenta?</Link>
          </div>
        </form>
      </div>
    </>
  );
}
