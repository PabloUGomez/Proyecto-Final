/*
@filtrar-favoritas="filtroActual.favorita = $event"
@filtrar-completadas="filtroActual.completada = $event"
*/
<template>
  <main class="bg-gray-900">
    <Header
      :tareas="tareas"
      @filtrar-tareas="filtroActual.categoria = $event"
      @ordenar-tareas="filtroActual.orden = $event"
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

type Tarea = {
  id: number;
  titulo: string;
  categoria: string;
  description: string;
  fecha: Date;
  completada: boolean;
  favorita : boolean;
};


export default {
  components: {
    ListaTareas,
    Header,
  },
  data() {
    return {
      tareas: [
        {
          id: 1,
          titulo: "Hacer la compra",
          categoria: "Evento",
          description: "Comprar alimentos y productos de primera necesidad.",
          fecha: new Date("2023-12-31"),
          completada: false,
          favorita: false,
        },
        {
          id: 2,
          titulo: "Hacer ejercicio",
          categoria: "Deportes",
          description: "Realizar ejercicio físico durante al menos 30 minutos.",
          fecha: new Date("2023-11-31"),
          completada: false,
          favorita: false,
        },
        {
          id: 3,
          titulo: "Leer un libro",
          categoria: "Entretenimiento",
          description: "Leer al menos un capítulo de un libro interesante.",
          fecha: new Date("2023-10-31"),
          completada: false,
          favorita: false,
        },
      ] as Tarea[],
      tareasFiltradas: [] as Tarea[],
      filtroActual: {
        categoria: "Todas",
        orden: "Titulo de A - Z",
        completada: false,
        favorita: false,
      },
      ordenes: [
        "Titulo de A - Z",
        " Titulo de Z - A",
        "Fecha Ascendente",
        "Fecha Descendente",
      ],
    };
  },
  mounted() {
    this.filtrarYOrdenarTareas();
  },
  methods: {
    filtrarYOrdenarTareas() {
      const { categoria, orden } = this.filtroActual;

      if (categoria !== "Todas") {
        this.tareasFiltradas = this.tareas.filter((tarea) =>
          tarea.categoria.toLowerCase().includes(categoria.toLowerCase())
        );
      } else {
        this.tareasFiltradas = this.tareas.slice(); // Copia de todas las tareas
      }

      this.cambiarOrden(orden);
    },
    cambiarOrden(orden: string) {
      console.log("cambiarOrden", orden);

      switch (orden) {
        case "Titulo de A - Z":
          this.tareasFiltradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
          break;
        case "Titulo de Z - A":
          this.tareasFiltradas.sort((a, b) => b.titulo.localeCompare(a.titulo));
          break;
        case "Fecha Ascendente":
          this.tareasFiltradas.sort(
            (a, b) => a.fecha.getTime() - b.fecha.getTime()
          );
          break;
        case "Fecha Descendente":
          this.tareasFiltradas.sort(
            (a, b) => b.fecha.getTime() - a.fecha.getTime()
          );
          break;
      }
    },
    crearTarea(tarea: {
      titulo: string;
      categoria: string;
      fecha: string;
      descripcion: string;
    }) {
      this.tareas.push({
        id: this.tareas.length + 1,
        titulo: tarea.titulo,
        categoria: tarea.categoria,
        description: tarea.descripcion,
        fecha: new Date(tarea.fecha),
        completada: false,
        favorita: false,
      });
      this.filtrarYOrdenarTareas();
    },
    completarTarea(id: number) {
      const tarea = this.tareas.find((tarea) => tarea.id === id);
      console.log(tarea);
      
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
