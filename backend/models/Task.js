const mongoose = require("mongoose");

const taskScheme = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  date: Date,
  favorite: Boolean,
  isComplete: Boolean,
});

const Task = mongoose.model("Task", taskScheme);

module.exports = Task;
