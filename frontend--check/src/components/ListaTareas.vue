<template>
  <div class="flex-col">
    <formPopUp
      class="z-10"
      v-if="mostrar"
      @cerrar="cerrarFormulario"
<<<<<<< HEAD
      @enviarDatos="crearTarea"
      :titulo="titulo"
      :descripcion="descripcion"
      :categoria="categoria"
=======
      @enviarDatos="crearEditarTarea"
      :tareaAEditar="tareaAEditar"
>>>>>>> Pablo
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
<<<<<<< HEAD
      <Tarea
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @completar-tarea="completarTarea"
        @favorita-tarea="marcarFavorita"
        @borrar-tarea="borrarTarea"
        @actualizar-tarea="actualizarTarea"
      ></Tarea>
=======
        <Tarea
          v-for="tarea in tareas"
          :key="tarea._id"
          :tarea="tarea"
          @completar-tarea="completarTarea"
          @favorita-tarea="marcarFavorita"
          @borrar-tarea="borrarTarea"
          @editar-tarea="editarTarea"
        />
>>>>>>> Pablo
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
        _id: string;
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
<<<<<<< HEAD
      titulo: "",
      descripcion: "",
      categoria: "",
=======
      tareaAEditar: {
        _id: "",
        titulo: "",
        categoria: "",
        descripcion: "",
      } as {
        _id: string;
        titulo: string;
        categoria: string;
        descripcion: string;
      },
>>>>>>> Pablo
    };
  },
  methods: {
    mostrarFormulario() {
      this.mostrar = true;
    },
    cerrarFormulario() {
      this.mostrar = false;
    },
    crearEditarTarea(tarea: {
      _id: string;
      titulo: string;
      categoria: string;
      descripcion: string;
    }) {
      if (tarea._id) {
        this.$emit(
          "editar-tarea",
          tarea._id,
          tarea.titulo,
          tarea.categoria,
          tarea.descripcion
        );
        this.tareaAEditar._id = "";
      } else {
        this.crearTarea(
          tarea as {
            titulo: string;
            categoria: string;
            descripcion: string;
          }
        );
      }
      this.cerrarFormulario();
    },
    crearTarea(tarea: {
      titulo: string;
      categoria: string;
      descripcion: string;
<<<<<<< HEAD
      completada: boolean;
      favorita: boolean;
=======
>>>>>>> Pablo
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
    completarTarea(_id: string) {
      this.$emit("completar-tarea", _id);
    },
    marcarFavorita(_id: string) {
      this.$emit("favorita-tarea", _id);
    },
    borrarTarea(_id: string) {
      this.$emit("borrar-tarea", _id);
    },
<<<<<<< HEAD
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
=======
    editarTarea(
      _id: string,
      titulo: string,
      categoria: string,
      descripcion: string
    ) {
      this.tareaAEditar._id = _id;
      this.tareaAEditar.titulo = titulo;
      this.tareaAEditar.categoria = categoria;
      this.tareaAEditar.descripcion = descripcion;
      this.mostrar = true;
>>>>>>> Pablo
    },
  },
};
</script>
