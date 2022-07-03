const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");

function signup(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  //validating response
  const schema = {
    name: { type: "string", optional: false, max: 100 },
    email: { type: "email", optional: false },
    password: {
      type: "string",
      optional: false,
      custom: (v, errors) => {
        if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
        if (!/[a-zA-Z]/.test(v)) errors.push({ type: "atLeastOneLetter" });
        return v;
      },
      min: 8,
      max: 20,
      messages: {
        stringPattern: "pass value must contain a digit",
        stringMin: "Your pass value is too short",
        stringMax: "Your pass value is too large",
      },
    },
  };

  const v = new validator();
  const validationResponse = v.validate(user, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationResponse,
    });
  }

  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
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
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong while creating user",
        error: error,
      });
    });
}

function login(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  //validating response
  const schema = {
    email: { type: "email", optional: false },
    password: {
      type: "string",
      optional: false,
    },
  };

  const v = new validator();
  const validationResponse = v.validate(user, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationResponse,
    });
  }
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.SECRET || "SECRET",
                {
                  expiresIn: "3d",
                },
                function (err, token) {
                  console.log(token);
                  res.status(200).json({
                    message: "Authentication succeful",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  signup: signup,
  login: login,
};
