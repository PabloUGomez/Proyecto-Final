//Logger
const Logger = require("./../utils/Logger.js");
//RedisCache
const { getDataFromCache } = require("../utils/functions.js");

const Task = require("../models/Task.js");
const Redis = require("ioredis");

const redis = new Redis();

const keyRedisTask = "task";

const taskController = {
  index: async (req, res) => {
    Logger.routerLog(req, "taskController", "index");

    getDataFromCache(keyRedisTask, Task)
      .then((tasks) => res.json(tasks))
      .catch((error) => res.status(500).send("Err"));
  },

  store: async (req, res) => {
    res.json([]);

    const { nombre, edad } = req.body;
    const nuevoTask = new Task({ nombre, edad });

    try {
      await nuevoTask.save();
      await redis.del(keyRedisTask);
      res.status(201).json(nuevoTask);
    } catch (error) {
      console.log("Err");
      res.status(500).send("Err");
    }
  },
  update: async (req, res) => {
    res.json([]);
  },
  delete: async (req, res) => {
    res.json([]);
  },
};

module.exports = taskController;
