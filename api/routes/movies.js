const express = require("express");
const router = express.Router();
const axios = require("axios");
const keyTheMovie = "api_key=eb10571b548de064d2271c92b4747216";
const UrlTheMovieDb = "https://api.themoviedb.org/3";

router.get("/:id", (req, res) => {
  const movieId = req.params.id;

  axios(`${UrlTheMovieDb}/movie/${movieId}?${keyTheMovie}`)
    .then((movie) => {
      res.json(movie.data);
    })
    .catch(() => res.sendStatus(404));
});

router.get("/search/:title/:page", (req, res) => {
  const { page, title } = req.params;

  console.log(title, page);

  axios(
    `${UrlTheMovieDb}/search/movie?${keyTheMovie}&query=${title}&page=${page}`
  )
    .then((movie) => res.json(movie.data))
    .catch(() => res.sendStatus(404));
});

module.exports = router;
