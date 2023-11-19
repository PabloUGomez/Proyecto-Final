//Logger
const Logger = require("./../utils/Logger.js");
//RedisCache
const { getDataFromCache, setDataInModel } = require("../utils/functions.js");

const Task = require("../models/Task.js");
const Redis = require("ioredis");

const redis = new Redis();

const keyRedisTask = "task";

const taskController = {
  index: async (req, res) => {
    Logger.routerLog(req, "GET", "taskController", "index");

    getDataFromCache(keyRedisTask, Task)
      .then((tasks) => res.json(tasks))
      .catch((error) => res.status(500).send(error));
  },

  store: async (req, res) => {
    Logger.routerLog(req, "POST", "taskController", "store");

    const { userId, title, description, isComplete } = req.body;

    setDataInModel(keyRedisTask, Task, {
      userId,
      title,
      description,
      isComplete,
    })
      .then((task) => res.status(201).json(task))
      .catch((error) => res.status(500).send(error));
  },
  update: async (req, res) => {
    res.json([]);
  },
  delete: async (req, res) => {
    res.json([]);
  },
};

module.exports = taskController;
