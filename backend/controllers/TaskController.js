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

    try {
      const tasks = await Task.find();
      //const tasks = await getDataFromCache(keyRedisTask, Task);
      res.json(tasks);
    } catch (error) {
      res.status(500).send("Err");
    }
    /*
      .then((tasks) => res.json(tasks))
      .catch((error) => res.status(500).send("Err"));
      */
  },

  store: async (req, res) => {
    console.log("Solicitud de post");

    const { userId, titulo, categoria, descripcion,fecha } = req.body;
    const nuevoTask = new Task({
      userId,
      titulo,
      categoria,
      descripcion,
      fecha,
      completada: false,
      favorita: false,
    });

    try {
      await nuevoTask.save();
      await redis.del(keyRedisTask);
      res.status(201).json(nuevoTask);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      res.status(500).send("Error al guardar la tarea");
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
