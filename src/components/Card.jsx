/* eslint-disable jsx-a11y/alt-text */

import "../styles/card.css";
import { Link } from "react-router-dom";
function Card({ movie }) {

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="item">
        <div className="card-image">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://cdn1.eldia.com/042019/1555675137856.jpg"
            }
          />

          <div className="content">
            <h1 className="title is-1">{movie.title}</h1>
            <h1 className="subtitle is-6">{movie.release_date}</h1>
            <p>
              {movie.overview.length >= 180
                ? movie.overview.slice(0, 180) + "..."
                : movie.overview}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
