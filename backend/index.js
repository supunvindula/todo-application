const express = require("express");
const cors = require("cors");
const app = express();

const todoRoute = require("./route/todos");
const userRoute = require("./route/users");

app.use(cors());
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
