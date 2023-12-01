import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/tasks";
//const API_BASE_URL = "http://181.31.20.146:33333/api/tasks";

export default {
  async obtenerTareas(uid: string) {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          auth: uid,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener las tareas");
    }
  },

  async crearTarea(userId: string, tarea: any) {
    try {
      const response = await axios.post(
        API_BASE_URL,
        {
          userId,
          ...tarea,
        },
        {
          headers: {
            auth: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al crear la tarea");
    }
  },

  async actualizarTarea(
    userId: string,
    id: string,
    titulo: string,
    categoria: string,
    descripcion: string
  ) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {userId, titulo, categoria, descripcion});
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la tarea");
    }
  },

  async borrarTarea(id: string, userId: string) {
    console.log(userId);

    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          auth: userId,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error al borrar la tarea");
    }
  },
};
