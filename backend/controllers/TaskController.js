const Task = require("../models/Task.js");
const Redis = require("ioredis");

const redis = new Redis();

const keyRedisTask = "task";

const taskController = {
  index: async (req, res) => {
    try {
      const cacheTasks = await redis.get(keyRedisTask);
      if (cacheTasks) {
        res.json(JSON.parse(cacheTasks));
      } else {
        const tasks = await Task.find();
        await redis.setex(keyRedisTask, 60, JSON.stringify(tasks));
        res.json(tasks);
      }
    } catch (error) {
      console.log("Err");
      res.status(500).send("Err");
    }
  },
  store: async (req, res) => {
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
  update: async (req, res) => {},
  delete: async (req, res) => {},
};

module.exports = taskController;
