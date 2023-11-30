import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000/api/tasks';

export default {
  async obtenerTareas() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;    
    } catch (error) {
      throw new Error('Error al obtener las tareas');
    }
  },

  async crearTarea(userId: string, tarea: any) {
    try {
      const response = await axios.post(API_BASE_URL, {
        userId,
        ...tarea,
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la tarea');
    }
  },

  async actualizarTarea(id: number, tarea: any) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, tarea);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar la tarea');
    }
  },

  async borrarTarea(id: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al borrar la tarea');
    }
  },
};
