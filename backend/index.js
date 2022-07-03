const express = require("express");
const cors = require("cors");
const app = express();

const todoRoute = require("./route/todos");

app.use(cors());
app.use(express.json());
app.use("/todo", todoRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
