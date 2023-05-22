const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo");

const ToDo = mongoose.model("ToDo", {
  name: {
    type: String,
    default: "",
  },
});

app.post("/create", async (req, res) => {
  try {
    const newToDo = new ToDo({
      name: req.body.name,
    });
    await newToDo.save();
    res.status(201).json({ message: "New task created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const tasks = await ToDo.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/update", async (req, res) => {
  try {
    if (req.body.name && req.body.id) {
      const task = await ToDo.findById(req.body.id);
      task.name = req.body.name;
      await task.save();
      res.json({ message: "Task updated" });
    }
  } catch (error) {
    res.status(418).json({ message: error.message });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    if (req.body.id && req.body.name) {
      const task = await ToDo.findById(req.body.id);
      task.name = req.body.name;
      await task.remove();
    } else {
      res.status(406).json({ message: "Parameter is missing" });
    }
  } catch (error) {
    res.status(418).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("la page n'existe pas");
});

app.listen(3000, () => {
  console.log("Sever started");
});
