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

const redis = new Redis();

const keyRedisTask = "task";

const taskController = {
  index: async (request, response) => {
    Logger.routerLog(request, "GET", "taskController", "index");

    getDataFromCache(keyRedisTask, Task)
      .then((tasks) => response.json(tasks))
      .catch((error) => response.status(500).send(error));
  },

  store: async (request, response) => {
    Logger.routerLog(request, "POST", "taskController", "store");

    const { userId, title, description, isComplete } = request.body;
    const data = {
      userId,
      title,
      description,
      isComplete,
    };

    setDataInModel(keyRedisTask, Task, data)
      .then((task) => response.status(201).json(task))
      .catch((error) => response.status(500).send(error));
  },
  update: async (request, response) => {
    Logger.routerLog(request, "PUT", "taskController", "update");

    //Parameters
    const taskId = request.params.id;

    //Body
    const { userId, title, description, isComplete } = request.body;

    const filter = { _id: taskId, userId: userId };

    const updateFields = { title, description, isComplete };

    updateDataInModel(keyRedisTask, Task, filter, updateFields)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
  delete: async (request, response) => {
    Logger.routerLog(request, "DELETE", "taskController", "delete");

    //Parameters
    const taskId = request.params.id;

    //Body
    const { userId } = request.body;

    const filter = { _id: taskId, userId: userId };

    deleteDocumentInModel(keyRedisTask, Task, filter)
      .then((updatedTask) => response.status(201).json(updatedTask))
      .catch((error) => response.status(500).send(error));
  },
};

module.exports = taskController;
