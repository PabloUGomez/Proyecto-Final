const express = require("express");
const path = require("path");
const taskController = require("../controllers/TaskController.js");

const { CheckAuthHeader } = require("./../middlewares/AuthMiddleware.js");

const router = express.Router();

router.use(express.json());

// Sirve los archivos estáticos desde la carpeta 'dist'

router.get("/api/tasks", CheckAuthHeader, taskController.index);
router.post("/api/tasks", CheckAuthHeader, taskController.store);
router.put("/api/tasks/:id", CheckAuthHeader, taskController.update);
router.delete("/api/tasks/:id", CheckAuthHeader, taskController.delete);

router.put(
  "/api/tasks/:id/favorita",
  CheckAuthHeader,
  taskController.setFavorite
);
router.put(
  "/api/tasks/:id/completada",
  CheckAuthHeader,
  taskController.setComplete
);

module.exports = router;
