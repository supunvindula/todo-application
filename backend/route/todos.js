const express = require("express");
const todoController = require("../Controllers/todo.controller");
const checkAuthMiddleware = require("../middleware/check-auth");
const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, todoController.create);
router.get("/", checkAuthMiddleware.checkAuth, todoController.getTasks);
router.patch("/:id", checkAuthMiddleware.checkAuth, todoController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, todoController.deleteTodo);

module.exports = router;
