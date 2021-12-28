const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");
const keyTheMovie = "api_key=eb10571b548de064d2271c92b4747216";
const UrlTheMovieDb = "https://api.themoviedb.org/3";

async function forAsync(favs) {
  let movies = [];
  for (let i = 0; i < favs.length; i++) {
    await axios(`${UrlTheMovieDb}/movie/${favs[i]}?${keyTheMovie}`)
    .then((movie) => {
        movies.push(movie);
      }
    );
  }
  return movies;
}

router.get("/", (req, res) => {
  //if (!req.user.id) res.sendStatus(401)

  User.findAll()
    .then((users) => res.send(users))
    .catch(() => res.sendStatus(404));
});

router.get("/:id", (req, res) => {
  //if (!req.user.id) res.sendStatus(401)

  const id = req.params.id;
  console.log(id);
  User.findOne({ where: { id: id } })
    .then((user) => res.send(user))
    .catch(() => res.sendStatus(404));
});

router.get("/:id/favorites", (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id: id } })
    .then((user) => {
      forAsync(user.favoritesID).then((favorites) => {
        let favs = [];
        favorites.forEach((fav) => favs.push(fav.data));
        res.send(favs);
      });
    })
    .catch(() => res.sendStatus(404));
});

router.post("/search/", (req, res) => {
  const { name } = req.body;
  User.findAll({
    where: {
      username: {
        [Op.like]: `%${name}%`,
      },
    },
  }).then((users) => {
    res.json({
      userSearch: name,
      responses: users,
    });
  });
});

module.exports = router;
