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
    ></ListaTareas>
  </main>
</template>

<script lang="ts">
import "../assets/main.css";
import ListaTareas from "../components/ListaTareas.vue";
import Header from "../components/Header.vue";
import { auth } from "../firebaseConfig";
import axios from "axios";
import { DateTime } from "luxon";

type Tarea = {
  userId: string;
  id: number;
  titulo: string;
  categoria: string;
  description: string;
  fecha: Date;
  completada: boolean;
  favorita: boolean;
};

export default {
  components: {
    ListaTareas,
    Header,
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
      },
      ordenes: [
        "Titulo de A - Z",
        "Titulo de Z - A",
        "Fecha Ascendente",
        "Fecha Descendente",
      ],
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
          tarea.categoria.toLowerCase().includes(categoria.toLowerCase())
        );
      } else if (completadas) {
        this.tareasFiltradas = this.tareas.filter((tarea) => tarea.completada);
        this.filtroActual.favoritas = false;
      } else if (favoritas) {
        this.tareasFiltradas = this.tareas.filter((tarea) => tarea.favorita);
        this.filtroActual.completadas = false;
      } else {
        this.tareasFiltradas = this.tareas;
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
        const response = await axios.get("http://127.0.0.1:3000/api/tasks");
        this.tareas = response.data;
        this.filtrarYOrdenarTareas();
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    },
    async crearTarea(tarea: {
      titulo: string;
      categoria: string;
      fecha: Date;
      descripcion: string;
    }) {
      try {
        const response = (await axios.post("http://127.0.0.1:3000/api/tasks", {
          userId: this.userId,
          id: this.tareas.length + 1,
          titulo: tarea.titulo,
          categoria: tarea.categoria,
          descripcion: tarea.descripcion,
          fecha: DateTime.local().toFormat("dd-MM-yyyy HH:mm"),
        })) as Tarea;

        // Después de crear la tarea, vuelve a cargar las tareas
        await this.cargarTareas();
      } catch (error) {
        console.error("Error al crear la tarea:", error);
      }
    },
    completarTarea(id: number) {
      const tarea = this.tareas.find((tarea) => tarea.id === id);

      if (tarea) {
        tarea.completada = !tarea.completada;
      }
    },
    marcarFavorita(id: number) {
      const tarea = this.tareas.find((tarea) => tarea.id === id);

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
