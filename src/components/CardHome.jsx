/* eslint-disable jsx-a11y/alt-text */
import {Link} from "react-router-dom";
import "../styles/banner.css";


function CardHome({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div id="cardImgane">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </div>
    </Link>
  );
}

export default CardHome;
