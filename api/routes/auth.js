const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");


function isLogin(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.sendStatus(401);
}

router.post("/register", (req, res) => {
  const { email } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (user) res.sendStatus(400);
    else {
      User.create(req.body)
        .then((newUser) => {
          res.statusCode = 201;
          res.send(newUser);
        })
        .catch((err) => {
          req.body.errorMio = "no entro";
          res.status(404).send(err);
        });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.send("logout");
});

router.get("/me", isLogin, (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(req.user);
});


module.exports = router;
