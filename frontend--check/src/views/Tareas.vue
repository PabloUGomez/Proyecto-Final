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
  dueDate: Date;
  completed: boolean;
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
          dueDate: new Date("2023-12-31"),
          completed: false,
        },
        {
          id: 2,
          titulo: "Hacer ejercicio",
          categoria: "Deportes",
          description: "Realizar ejercicio físico durante al menos 30 minutos.",
          dueDate: new Date("2023-11-31"),
          completed: false,
        },
        {
          id: 3,
          titulo: "Leer un libro",
          categoria: "Entretenimiento",
          description: "Leer al menos un capítulo de un libro interesante.",
          dueDate: new Date("2023-10-31"),
          completed: false,
        },
      ] as Tarea[],
      tareasFiltradas: [] as Tarea[],
      filtroActual: {
        categoria: "Todas",
        orden: "Titulo de A - Z",
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
            (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
          );
          break;
        case "Fecha Descendente":
          this.tareasFiltradas.sort(
            (a, b) => b.dueDate.getTime() - a.dueDate.getTime()
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
        dueDate: new Date(tarea.fecha),
        completed: false,
      });
      this.filtrarYOrdenarTareas();
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
