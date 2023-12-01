<template>
  <div class="flex-col">
    <formPopUp
      class="z-10"
      v-if="mostrar"
      @cerrar="cerrarFormulario"
      @enviarDatos="crearTarea"
      :titulo="titulo"
      :descripcion="descripcion"
      :categoria="categoria"
    />
    <ul class="p-4 md:w-2/3 xl:w-1/2 w-full mx-auto">
      <div
        class="border-2 border-indigo-500 border-dashed mb-6 rounded-lg p-6 duration-300 hover:bg-indigo-600"
        @click="mostrarFormulario"
      >
        <h3 class="text-1xl font-bold text-white text-center">
          + Agregar tarea
        </h3>
      </div>
      <Tarea
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @completar-tarea="completarTarea"
        @favorita-tarea="marcarFavorita"
        @borrar-tarea="borrarTarea"
        @actualizar-tarea="actualizarTarea"
      ></Tarea>
    </ul>
  </div>
</template>

<script lang="ts">
import Tarea from "./Tarea.vue";
import formPopUp from "./formPopUp.vue";
import { DateTime } from "luxon";

export default {
  components: {
    Tarea,
    formPopUp,
  },
  props: {
    tareas: {
      type: Array as () => Array<{
        _id: number;
        titulo: string;
        categoria: string;
        descripcion: string;
        fecha: Date;
        completada: boolean;
        favorita: boolean;
      }>,
      required: true,
    },
  },
  data() {
    return {
      mostrar: false,
      titulo: "",
      descripcion: "",
      categoria: "",
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
      descripcion: string;
      completada: boolean;
      favorita: boolean;
    }) {
      this.$emit("enviarDatos", {
        titulo: tarea.titulo,
        categoria: tarea.categoria,
        descripcion: tarea.descripcion,
        fecha: DateTime.local().toFormat("dd-MM-yyyy HH:mm"),
        completada: false,
        favorita: false,
      });
    },
    completarTarea(_id: number) {
      this.$emit("completar-tarea", _id);
    },
    marcarFavorita(_id: number) {
      this.$emit("favorita-tarea", _id);
    },
    borrarTarea(_id: number) {
      this.$emit("borrar-tarea", _id);
    },
    actualizarTarea(
      _id: number,
      titulo: string,
      descripcion: string,
      categoria: string
    ) {
      this.mostrarFormulario();
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.categoria = categoria;

      //this.$emit("actualizar-tarea", _id);
    },
  },
};
</script>
