const express = require("express");
const taskController = require("../controllers/TaskController.js");

const router = express.Router();

router.get("/tasks", taskController.index);
router.post("/tasks", taskController.store);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete);

module.exports = router;
