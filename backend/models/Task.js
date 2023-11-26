const mongoose = require("mongoose");

const taskScheme = new mongoose.Schema({
  userId: { type: String, required: true },
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  completada: { type: Boolean, required: true },
  favorita: { type: Boolean, required: true },
});

const Task = mongoose.model("Task", taskScheme);

module.exports = Task;
