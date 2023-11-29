const express = require("express");
const path = require("path");
const taskController = require("../controllers/TaskController.js");

const router = express.Router();

router.use(express.json());

// Sirve los archivos estáticos desde la carpeta 'dist'
router.use(express.static(path.join(__dirname, "../../frontend--check/dist")));

router.get("/api/tasks", taskController.index);
router.post("/api/tasks", taskController.store);
router.put("/api/tasks/:id", taskController.update);
router.delete("/api/tasks/:id", taskController.delete);

// Ruta para la página principal (index.html)
router.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "G:GitHub ReposProyecto-Final-DAII\frontend--checkindex.html"
    )
  );
});
module.exports = router;
