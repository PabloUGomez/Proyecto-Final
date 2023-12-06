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
      const response = await axios.put(
        `${API_BASE_URL}/${id}`,
        {
          titulo,
          categoria,
          descripcion,
        },
        {
          headers: {
            auth: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la tarea");
    }
  },

  async borrarTarea(id: string, userId: string) {
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

  async favoritaTarea(userId: string, id: string, favorita: boolean) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${id}/favorita`,
        {
          favorita,
        },
        {
          headers: {
            auth: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la tarea");
    }
  },

  async completadaTarea(userId: string, id: string, completada: boolean) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${id}/completada`,
        {
          completada,
        },
        {
          headers: {
            auth: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la tarea");
    }
  },
};
