<template>
  <div class="flex-col">
    <formPopUp v-if="mostrar" @cerrar="cerrarFormulario" @enviarDatos="crearTarea" />
    <ul>
      <div class="border-2 border-indigo-500 border-dashed mb-6 rounded-lg p-6 duration-300 hover:bg-indigo-600" @click="mostrarFormulario">
        <h3 class="text-1xl font-bold text-white text-center">+ Agregar tarea</h3>
      </div>
      <Tarea v-for="tarea in tareas" :key="tarea.id" :tarea="tarea"></Tarea>
    </ul>
  </div>
</template>

<script lang="ts">
import Tarea from './Tarea.vue';
import formPopUp from './formPopUp.vue';

export default {
  components: {
    Tarea,
    formPopUp,
  },
  props: {
    tareas: {
      type: Array as () => Array<{
        id: number;
        name: string;
        categoria: string;
        description: string;
        dueDate: Date;
        completed: boolean;
      }>,
      required: true,
    },
  },
  data() {
    return {
      mostrar: false,
    };
  },
  methods: {
    mostrarFormulario() {
      this.mostrar = true;
    },
    cerrarFormulario() {
      this.mostrar = false;
    },
    crearTarea(tarea: {
      titulo: string;
      categoria: string;
      fecha: string;
      descripcion: string;
    }) {
      console.log('creando tarea');
      console.log(tarea);
      
      
      this.tareas.push({
        id: this.tareas.length + 1,
        name: tarea.titulo,
        categoria: tarea.categoria,
        description: tarea.descripcion,
        dueDate: new Date(tarea.fecha),
        completed: false,
      });
    },
  },
};
</script>
