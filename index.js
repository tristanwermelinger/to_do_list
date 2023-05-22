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
    res.status(201).json({ message: "Created" });
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

app.all("*", (req, res) => {
  res.status(404).send("la page n'existe pas");
});

app.listen(3000, () => {
  console.log("Sever started");
});
