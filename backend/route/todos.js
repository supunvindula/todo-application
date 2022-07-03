const express = require("express");
const todoController = require("../Controllers/todo.controller");

const router = express.Router();

router.post("/", todoController.create);
router.get("/", todoController.getTasks);
router.patch("/:id", todoController.update);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
