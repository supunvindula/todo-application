const models = require("../models");
const validator = require("fastest-validator");

function create(req, res) {
  const todo = {
    title: req.body.title,
    description: req.body.description,
    status: "todo",
    userId: req.userData.userId,
  };

  //validating response
  const schema = {
    title: { type: "string", optional: false, max: 100 },
    description: { type: "string", optional: true, max: 500 },
    status: {
      type: "enum",
      values: ["todo", "inprogress", "done"],
      optional: false,
    },
  };

  const v = new validator();
  const validationResponse = v.validate(todo, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationResponse,
    });
  }

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
  models.Todo.findAll({ where: { userId: req.userData.userId } })
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
    userId: req.userData.userId,
  };

  //validating response
  const schema = {
    title: { type: "string", optional: true, max: 100 },
    description: { type: "string", optional: true, max: 500 },
    status: {
      type: "enum",
      values: ["todo", "inprogress", "done"],
      optional: true,
    },
  };

  const v = new validator();
  const validationResponse = v.validate(updatedTodo, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationResponse,
    });
  }

  models.Todo.update(updatedTodo, {
    where: {
      id: id,
      userId: req.userData.userId,
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
  models.Todo.destroy({ where: { id: id, userId: req.userData.userId } })
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
