import axios from "axios";
const URL = "http://localhost:3000";

const crearTarea = (tarea) => {
  axios
    .post(`${URL}/nuevaTarea`, tarea)
    .then((res) => {
      console.log("Tarea creada: ", res.data);
    })
    .catch((err) => {
      console.log("Error al agregar la tarea");
    });
};

const eliminarTarea = (tarea) => {
  axios
    .delete(`${URL}/nuevaTarea`, tarea)
    .then((res) => {
      console.log("Tarea a eliminar: ", tarea);
    })
    .catch((err) => {
      console.log("Error al eliminar la tarea");
    });
};

const editarTarea = (tarea) => {
  axios
    .update(`${URL}/nuevaTarea`, tarea)
    .then((res) => {
      console.log("Tarea a eliminar: ", tarea);
    })
    .catch((err) => {
      console.log("Error al eliminar la tarea");
    });
};

const tareaCompletada = (tarea) => {
  axios
    .put(`${URL}/nuevaTarea`, tarea)
    .then((res) => {
      console.log("Tarea completada: ", tarea);
    })
    .catch((err) => {
      console.log("Error al eliminar la tarea");
    });
};
