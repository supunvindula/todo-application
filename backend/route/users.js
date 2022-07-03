const express = require("express");
const userController = require("../Controllers/user.controller");

const router = express.Router();

router.post("/sign-up", userController.signup);

module.exports = router;
