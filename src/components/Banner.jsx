import React from "react";
import axios from "axios";
import CardHome from "./CardHome";
import "../styles/banner.css";

function Banner() {
  const api_key = "eb10571b548de064d2271c92b4747216";
  const [discover, setDiscover] = React.useState([]);
  const [discoverp2, setDiscoverp2] = React.useState([]);
  const [discoverp3, setDiscoverp3] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
      .then((res) => res.data)
      .then((data) => setDiscover(data.results));

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=2`
      )
      .then((res) => res.data)
      .then((data) => setDiscoverp2(data.results));

    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`
      )
      .then((res) => res.data)
      .then((data) => setDiscoverp3(data.results));
  }, []);

  return (
    <>
      <div className="banner">
        <div className="capa">
          <div className="titulo">
            <h1 className="title">OMD Proyect</h1>
          </div>
        </div>
      </div>
      <div className="content">
        <h1 className="subtitle mt-3">Movies</h1>
        <div className="wrapper">
          {discover.map((movie, i) => {
            return (
              <div className="itemA">
                <CardHome movie={movie} key={i} />
              </div>
            );
          })}
        </div>
        <h1 className="subtitle mt-3">Dicover</h1>
        <div className="wrapper">
          {discoverp2.map((movie, i) => {
            return (
              <div className="itemA">
                <CardHome movie={movie} key={i} />
              </div>
            );
          })}
        </div>
        <h1 className="subtitle mt-3">TV programs</h1>
        <div className="wrapper">
          {discoverp3.map((movie, i) => {
            return (
              <div className="itemA">
                <CardHome movie={movie} key={i} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Banner;
