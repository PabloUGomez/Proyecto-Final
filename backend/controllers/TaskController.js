//Env
require("dotenv").config();
const env = process.env;
//Logger
const Logger = require("./../utils/Logger.js");
//RedisCache
const {
  getDataFromCache,
  setDataInModel,
  updateDataInModel,
  deleteDocumentInModel,
} = require("../utils/functions.js");

const Task = require("../models/Task.js");
const keyRedisTask = "task";

const taskController = {
  index: async (request, response) => {
    Logger.routerLog(request, "GET", "taskController", "index");
    const userId = request.headers["auth"];

    getDataFromCache(keyRedisTask, Task, userId)
      .then((tasks) => response.status(200).json(tasks))
      .catch((error) => response.status(500).send(error));
  },

  store: async (request, response) => {
    Logger.routerLog(request, "POST", "taskController", "store");

    const userId = request.headers["auth"];

    const { titulo, categoria, descripcion, fecha } = request.body;
    const nuevoTask = new Task({
      userId,
      titulo,
      categoria,
      descripcion,
      fecha,
      completada: false,
      favorita: false,
    });

    setDataInModel(keyRedisTask, Task, userId, nuevoTask)
      .then((task) => response.status(201).json(task))
      .catch((error) => response.status(500).send("Error al guardar la tarea"));
  },

  update: async (request, response) => {
    Logger.routerLog(request, "PUT", "taskController", "update");

    const userId = request.headers["auth"];

    //Parameters
    const taskId = request.params.id;

    //Body
    const { titulo, descripcion, categoria } = request.body;

    const filter = { _id: taskId, userId: userId };

    const updateFields = { titulo, descripcion, categoria };
    updateDataInModel(keyRedisTask, Task, userId, filter, updateFields)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
  delete: async (request, response) => {
    Logger.routerLog(request, "DELETE", "taskController", "delete");

    const userId = request.headers["auth"];

    //Parameters
    const taskId = request.params.id;

    //Body
    const filter = { _id: taskId, userId: userId };

    deleteDocumentInModel(keyRedisTask, Task, userId, filter)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },

  setFavorite: async (request, response) => {
    Logger.routerLog(request, "PUT", "taskController", "setFavorite");

    const userId = request.headers["auth"];

    //Parameters
    const taskId = request.params.id;

    //Body
    const { favorita } = request.body;

    const filter = { _id: taskId, userId: userId };

    const updateFields = { favorita };

    updateDataInModel(keyRedisTask, Task, userId, filter, updateFields)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
  setComplete: async (request, response) => {
    Logger.routerLog(request, "PUT", "taskController", "setComplete");

    const userId = request.headers["auth"];

    //Parameters
    const taskId = request.params.id;

    //Body
    const { completada } = request.body;

    const filter = { _id: taskId, userId: userId };

    const updateFields = { completada };

    updateDataInModel(keyRedisTask, Task, userId, filter, updateFields)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
};

module.exports = taskController;
