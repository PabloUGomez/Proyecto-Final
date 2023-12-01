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
const Redis = require("ioredis");
const redis = new Redis(env.REDIS_HOST);

const keyRedisTask = "task";

const taskController = {
  index: async (request, response) => {
    Logger.routerLog(request, "GET", "taskController", "index");
    const userId = request.headers["auth"];

    if (!userId) {
      response.status(400).json({ error: "Encabezado Auth no existe" });
      return;
    }

    getDataFromCache(keyRedisTask, Task, userId)
      .then((tasks) => response.status(200).json(tasks))
      .catch((error) => response.status(500).send(error));
  },

  store: async (request, response) => {
    Logger.routerLog(request, "POST", "taskController", "store");

    const userId = request.headers["auth"];

    if (!userId) {
      response.status(400).json({ error: "Encabezado Auth no existe" });
      return;
    }

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

    if (!userId) {
      response.status(400).json({ error: "Encabezado Auth no existe" });
      return;
    }

    //Parameters
    const taskId = request.params.id;

    //Body
    const { title, categoria, descripcion, fecha, completada, favorita } =
      request.body;

    console.log(request.body);

    const filter = { _id: taskId, userId: userId };

    const updateFields = { title, description, isComplete };

    updateDataInModel(keyRedisTask, Task, filter, updateFields)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
  delete: async (request, response) => {
    Logger.routerLog(request, "DELETE", "taskController", "delete");

    const userId = request.headers["auth"];

    if (!userId) {
      response.status(400).json({ error: "Encabezado Auth no existe" });
      return;
    }

    //Parameters
    const taskId = request.params.id;

    const filter = { _id: taskId, userId: userId };

    deleteDocumentInModel(keyRedisTask, Task, filter)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
};

module.exports = taskController;
