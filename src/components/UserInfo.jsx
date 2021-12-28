/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "./Card";
import "../styles/userInfo.css";

function UserInfo() {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  const [favoritos, setFavoritos] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
      });

    axios
      .get(`/api/users/${id}/favorites`)
      .then((res) => res.data)
      .then((data) => {
        setFavoritos(data);
      });
  }, []);

  return (
    <div>
      <div className="content">
        <div className="content-info">
          <h1 className="title is-4">{user.username}</h1>
          <p className="subtitle is-6">{user.email}</p>
        </div>
      </div>

      <div>
        <h1 className="title is-4 ml-2">Favoritos</h1>
        {favoritos.map((f, i) => {
          return <Card key={i} movie={f} />;
        })}
      </div>
    </div>
  );
}

export default UserInfo;
