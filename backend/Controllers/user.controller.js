const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signup(req, res) {
  bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash(req.body.password, salt, function (err, hash) {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      models.User.create(user)
        .then((result) => {
          res.status(201).json({ message: "user created" });
        })
        .catch((error) => {
          res.status(500).json({
            message: "something went wrong while creating user",
            error: error,
          });
        });
    });
  });
}

module.exports = {
  signup: signup,
};
