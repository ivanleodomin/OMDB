/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Error from "./components/Error";
import Register from "./components/Register";
import Search from "./components/Search";
import Info from "./components/Info";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";

import axios from "axios";
import {useDispatch} from "react-redux";
import { setLogin } from "./state/user";

import "./index.css";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => res.data)
      .then((user) => {
        dispatch(setLogin(user));
      });
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
       
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id">
          <UserInfo />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/search/:title/:page">
          <Search />
        </Route>
        <Route exact path="/movie/:id">
          <Info />
        </Route>
        <Route exact path="/404">
          <Error />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
