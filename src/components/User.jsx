/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import "../styles/user-card.css";

function User({ user }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" />
            </figure>
          </div>
          <div className="media-contenholat">
            <p className="title is-4">{user.username}</p>
            <p className="subtitle is-6">{user.email}</p>
          </div>
        </div>

        <div className="content-boton">
          <Link to={`users/${user.id}`}>
            <button className="button is-info">see more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default User;
