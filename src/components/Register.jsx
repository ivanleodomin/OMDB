import React from "react";
import axios from "axios";
import useForm from "../hooks/useForm";
import "../styles/forms.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/user";

function Register() {
  const password = useForm();
  const email = useForm();
  const username = useForm();

  const dispatch = useDispatch();
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/register", {
        email: email.data,
        password: password.data,
        username: username.data
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
        REGISTER
      </h1>
      <div className="div-form">
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label>username</label>
            <input
              {...username}
              name="email"
              className="input is-primary"
              type="text"
              placeholder="example"
            />
          </div>
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
              name="password"
            />
          </div>
          <div className="has-text-centered">
            <button type="submit" className="button is-success mt-4 mb-6">
              send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;


