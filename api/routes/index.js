const express = require("express");
const router = express.Router();
const auth = require("./auth");
const users = require("./users");
const movies = require("./movies");
const favourite = require("./favourite");

router.use("/favourite", favourite);
router.use("/auth", auth);
router.use("/users", users);
router.use("/movies", movies);

module.exports = router;
