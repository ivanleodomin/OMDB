/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";
import "../styles/info.css";

function Info() {
  const [movie, setMovie] = React.useState({});
  const { pathname } = useLocation();
  const movieId = pathname.slice(7);
  const [trailer, setTrailer] = React.useState("");

  const apiYoutube = "AIzaSyBigIOqDOCBr6RFBPRWftiWatCyl0B-FG0";

  const hanldeDelete = () => {
    axios
      .delete(`/api/favourite/${movie.id}`)
      .then(() => {
        alert("deleted successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const hanldeAdd = () => {
    axios
      .put(`/api/favourite/add`, {
        movieID: movie.id,
      })
      .then((user) => {
        alert("append to favorites");
      })
      .catch((e) => alert(e));
  };

  React.useEffect(() => {
    axios
      .get(`/api/movies/${movieId}`)
      .then((res) => res.data)
      .then((data) => {
        setMovie(data);
        return data;
      })
      .then((data) => {
        axios
          .get(
            `https://www.googleapis.com/youtube/v3/search?key=${apiYoutube}&part=id,snippet&q=${data.original_title}+trailer`
          )
          .then((res) => res.data)
          .then((trailer) => {
            //${trailer.items[0].id.videoId}
            //TYMMOjBUPMM
            setTrailer(
              `https://www.youtube.com/embed/${trailer.items[0].id.videoId}`
            );
          });
      })
      .then(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=eb10571b548de064d2271c92b4747216`
          )
          .then((res) => res.data);
      });
  }, []);

  return (
    <div className="content">
      <div>
        <div className="columns mt-3">
          <div className="column is-one-quarter mr-4 mb-2">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="column mr-3">
            <h1>{movie.title}</h1>
            <h3>Popularidad: {movie.popularity}</h3>
            <p>{movie.overview}</p>
            <div className="botones">
              <button
                className="button is-success is-rounded mr-1"
                onClick={hanldeAdd}
              >
                add
              </button>
              <button
                className="button is-danger is-rounded ml-1"
                onClick={hanldeDelete}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>Trailer:</h1>
      <div className="trailer">
        <iframe
          width="560"
          height="315"
          src={trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Info;
