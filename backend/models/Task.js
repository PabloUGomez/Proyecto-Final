const mongoose = require("mongoose");

const taskScheme = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  isComplete: Boolean,
});

const Task = mongoose.model("Task", taskScheme);

module.exports = Task;
