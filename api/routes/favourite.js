const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sequelize = require("sequelize");
const axios = require("axios");
const keyTheMovie = "api_key=eb10571b548de064d2271c92b4747216";
const UrlTheMovieDb = "https://api.themoviedb.org/3";

async function forAsync(favs) {
  let movies = [];
  for (let i = 0; i < favs.length; i++) {
    await axios(`${UrlTheMovieDb}/movie/${favs[i]}?${keyTheMovie}`).then(
      (movie) => {
        console.log("PELICULA", movie);
        movies.push(movie);
      }
    );
  }
  return movies;
}

router.put("/add", (req, res) => {
  const movieID = req.body.movieID;
  const { id, favoritesID } = req.user;

  console.log("logica if", favoritesID.includes(movieID))

  if (favoritesID.includes(movieID)) res.sendStatus(400);
  else {
    User.update(
      {
        favoritesID: [...favoritesID, movieID],
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    ).then((user) => res.json(user[1][0]));
  }
});

router.get("/", (req, res) => {
  forAsync(req.user.favoritesID).then((favorites) => {
    let favs = [];
    favorites.forEach((fav) => favs.push(fav.data));
    res.send(favs);
  });
});

router.delete("/:id", (req, res) => {
  const idMovie = req.params.id;
  const id = req.user.id;
  const favoritesCopie = req.user.favoritesID;
  const index = req.user.favoritesID.indexOf(idMovie);

  favoritesCopie.splice(index, 1);
  User.update(
    { favoritesID: favoritesCopie },
    {
      where: { id: id },
      returning: true,
    }
  ).then(() => res.sendStatus(200));
});

module.exports = router;
