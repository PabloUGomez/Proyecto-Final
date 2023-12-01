<template>
  <main class="bg-gray-900">
    <Header
      :tareas="tareas"
      @filtrar-tareas="filtroActual.categoria = $event"
      @ordenar-tareas="filtroActual.orden = $event"
      @filtrar-favoritas="filtroActual.favoritas = !filtroActual.favoritas"
      @filtrar-completadas="
        filtroActual.completadas = !filtroActual.completadas
      "
      :ordenes="ordenes"
    ></Header>
    <ListaTareas
      class="flex min-h-screen items-center"
      :tareas="tareasFiltradas"
      @enviarDatos="crearTarea"
      @completar-tarea="completarTarea($event)"
      @favorita-tarea="marcarFavorita($event)"
      @borrar-tarea="borrarTarea($event)"
      @editar-tarea="actualizarTarea"
    ></ListaTareas>
    <AlertaExito v-if="textoAlerta != ''" :texto="textoAlerta" />
  </main>
</template>

<script lang="ts">
import "../assets/main.css";
import ListaTareas from "../components/ListaTareas.vue";
import Header from "../components/Header.vue";
import { auth } from "../firebaseConfig";
import tareaServices from "../services/tareaServices";
import { DateTime } from "luxon";
import AlertaExito from "../components/AlertaExito.vue";
import { filter } from "vue/types/umd";

type Tarea = {
  _id: string;
  userId: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  fecha: Date;
  completada: boolean;
  favorita: boolean;
};

export default {
  components: {
    ListaTareas,
    Header,
    AlertaExito,
  },
  data() {
    return {
      userId: auth.currentUser?.uid as string,
      tareas: [] as Tarea[],
      tareasFiltradas: [] as Tarea[],
      filtroActual: {
        categoria: "Todas",
        orden: "Titulo de A - Z",
        completadas: false,
        favoritas: false,
      } as {
          categoria: string;
          orden: string;
          completadas: boolean;
          favoritas: boolean;
        },
      ordenes: [
        "Titulo de A - Z",
        "Titulo de Z - A",
        "Fecha Ascendente",
        "Fecha Descendente",
    ] as string[] ,
      textoAlerta: "" as string,
    };
  },
  async mounted() {
    await this.cargarTareas();
  },
  methods: {
    filtrarYOrdenarTareas() {
      const { categoria, orden, completadas, favoritas } = this.filtroActual;
      if (categoria !== "Todas") {
        this.tareasFiltradas = this.tareas.filter((tarea) =>
          (tarea.categoria.toLowerCase().includes(categoria.toLowerCase()) && !tarea.completada)
        );
      } else if (completadas) {
        this.tareasFiltradas = this.tareas.filter((tarea) => tarea.completada);
        this.filtroActual.favoritas = false;
      } else if (favoritas) {
        this.tareasFiltradas = this.tareas.filter((tarea) => tarea.favorita && !tarea.completada);
        this.filtroActual.completadas = false;
      } else {
        this.tareasFiltradas = this.tareas.filter((tarea) => !tarea.completada) ;
      }
      this.cambiarOrden(orden);
    },
    cambiarOrden(orden: string) {
      switch (orden) {
        case "Titulo de A - Z":
          this.tareasFiltradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
          break;
        case "Titulo de Z - A":
          this.tareasFiltradas.sort((a, b) => b.titulo.localeCompare(a.titulo));
          break;
        case "Fecha Ascendente":
          this.tareasFiltradas.sort((a, b) => {
            const dateA = DateTime.fromFormat(
              a.fecha,
              "dd-MM-yyyy HH:mm"
            ).toJSDate();
            const dateB = DateTime.fromFormat(
              b.fecha,
              "dd-MM-yyyy HH:mm"
            ).toJSDate();
            return dateA.getTime() - dateB.getTime();
          });
          break;

        case "Fecha Descendente":
          this.tareasFiltradas.sort((a, b) => {
            const dateA = DateTime.fromFormat(
              a.fecha,
              "dd-MM-yyyy HH:mm"
            ).toJSDate();
            const dateB = DateTime.fromFormat(
              b.fecha,
              "dd-MM-yyyy HH:mm"
            ).toJSDate();
            return dateB.getTime() - dateA.getTime();
          });
          break;
      }
    },
    async cargarTareas() {
      try {
        //s
        this.tareas = await tareaServices.obtenerTareas(this.userId);
        this.filtroActual.categoria = "Todas";
        this.filtrarYOrdenarTareas();
      } catch (error) {
        console.error(error.message);
      }
    },

    async crearTarea(tarea: {
      titulo: string;
      categoria: string;
      fecha: Date;
      descripcion: string;
    }) {
      try {
        await tareaServices.crearTarea(this.userId, tarea);
        // Después de crear la tarea, vuelve a cargar las tareas
        await this.cargarTareas();
        this.textoAlerta = "Tarea creada con exito";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        this.textoAlerta = "";
      } catch (error) {
        console.error(error.message);
      }
    },

    async actualizarTarea(_id , titulo , categoria , descripcion) {
      try {
        await tareaServices.actualizarTarea(this.userId, _id , titulo ,categoria , descripcion);
        // Después de actualizar la tarea, vuelve a cargar las tareas
        await this.cargarTareas();
      } catch (error) {
        console.error(error.message);
      }
    },

    async borrarTarea(_id: string) {
      try {
        await tareaServices.borrarTarea(_id , this.userId);
        // Después de borrar la tarea, vuelve a cargar las tareas
        await this.cargarTareas();
      } catch (error) {
        console.error(error.message);
      }
    },
    completarTarea(_id: string) {
      const tarea = this.tareas.find((tarea) => tarea._id === _id);      
      if (tarea) {
        tarea.completada = !tarea.completada;
      }
      this.filtrarYOrdenarTareas();
    },
    marcarFavorita(_id: string) {
      const tarea = this.tareas.find((tarea) => tarea._id === _id);

      if (tarea) {
        tarea.favorita = !tarea.favorita;
      }
    },
  },
  watch: {
    //Es como un Onchage
    filtroActual: {
      handler: "filtrarYOrdenarTareas",
      deep: true,
    },
  },
};
</script>
