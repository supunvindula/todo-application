const express = require("express");
const userController = require("../Controllers/user.controller");

const router = express.Router();

router.post("/sign-up", userController.signup);
router.post("/log-in", userController.login);

module.exports = router;
