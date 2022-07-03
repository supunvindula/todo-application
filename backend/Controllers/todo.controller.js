const models = require("../models");

function create(req, res) {
  const todo = {
    title: req.body.title,
    description: req.body.description,
    status: "todo",
  };

  models.Todo.create(todo)
    .then((result) => {
      res.status(201).json({
        message: "Todo created succesfully",
        todo: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something wrong",
        error: error,
      });
    });
}

function getTasks(req, res) {
  models.Todo.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

function update(req, res) {
  const id = req.params.id;

  const updatedTodo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };

  models.Todo.update(updatedTodo, {
    where: {
      id: id,
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "post updated",
          todo: updatedTodo,
        });
      } else {
        res.status(404).json({
          message: "todo not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
}

function deleteTodo(req, res) {
  const id = req.params.id;
  models.Todo.destroy({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "todo deleted",
        });
      } else {
        res.status(404).json({
          message: "todo not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
}

module.exports = {
  create: create,
  getTasks: getTasks,
  update: update,
  deleteTodo: deleteTodo,
};
