const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Todos = require("./models/Todo");
const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb database connection successfully");
});
app.get("/", (req, res) => {
  Todos.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

app.post("/create", (req, res) => {
  const todo = new Todos(req.body);
  todo
    .save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Todos.findById(id, (err, todo) => {
    res.json(todo);
  });
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  Todos.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {
      todo.text = req.body.text;

      todo
        .save()
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
