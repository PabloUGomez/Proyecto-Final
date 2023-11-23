<template>
  <header class="bg-gray-800 mb-6">
    <div class="py-3 px-6">
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="ml-2 font-semibold text-gray-100">
            {"Logo"}Administrador de tareas
          </span>
        </div>
        <div class="ml-2 flex">
          <div
            class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path
                fill-rule="evenodd"
                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-medium text-gray-100">Completadas</span>
          </div>
          <div
            class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-medium text-gray-100">Favoritas</span>
          </div>
          <div
            class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-indigo-600"
            @click="cerrarSesion"
          >
            <span class="text-sm font-medium text-gray-100">Cerrar sesion</span>
          </div>
        </div>
      </div>
      <div class="flex gap-x-2 pt-4 px-2 items-center">
        <div class="flex flex-1 gap-x-3">
          <details
            class="dropdown"
            ref="dropdownCategoria"
            @click="cerrarDropdown($refs.dropdownOrdenar)"
          >
            <summary
              class="m-1 btn text-sm font-medium flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-gray-700 py-2 px-4 text-white hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                /></svg
              >Categorias
            </summary>
            <ul
              class="pl-1 shadow menu dropdown-content z-[1] rounded-md w-52 bg-gray-700 py-2 px-4 text-white hover:bg-gray-600"
            >
              <li>
                <span
                  @click="
                    filtrarTarea($event.target.innerText);
                    cerrarDropdown($refs.dropdownCategoria);
                  "
                >
                  Todas</span
                >
              </li>
              <li
                v-for="categoria in obtenerCategoriasUnicas()"
                :key="categoria"
              >
                <span
                  @click="
                    filtrarTarea($event.target.innerText);
                    cerrarDropdown($refs.dropdownCategoria);
                  "
                >
                  {{ categoria }}</span
                >
              </li>
            </ul>
          </details>
          <details
            class="dropdown"
            ref="dropdownOrdenar"
            @click="cerrarDropdown($refs.dropdownCategoria)"
          >
            <summary
              class="m-1 btn text-sm font-medium flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-gray-700 py-2 px-4 text-white hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                /></svg
              >Ordenar por
            </summary>
            <ul
              class="pl-1 shadow menu dropdown-content z-[1] rounded-md w-52 bg-gray-700 py-2 px-4 text-white hover:bg-gray-600"
            >
              <li v-for="orden in ordenes" :key="orden">
                <span
                  @click="
                    ordenarTareas($event.target.innerText);
                    cerrarDropdown($refs.dropdownOrdenar);
                  "
                >
                  {{ orden }}</span
                >
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import {auth} from "../firebaseConfig";
import {signOut} from "firebase/auth";

export default Vue.extend({
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
    ordenes: {
      type: Array as () => Array<string>,
      required: true,
    },
  },
  methods: {
    cerrarDropdown(e: any) {
      e.removeAttribute("open");
    },
    obtenerCategoriasUnicas() {
      const categoriasSet = new Set(
        this.tareas.map((tarea) => tarea.categoria)
      );
      return Array.from(categoriasSet);
    },
    filtrarTarea(filtro: string) {
      this.$emit("filtrar-tareas", filtro);
    },
    ordenarTareas(orden: string) {
      this.$emit("ordenar-tareas", orden);
    },
    cerrarSesion() {
      signOut(auth)
        .then(() => {
          console.log("Sesión cerrada correctamente");
        })
        .catch((error:any) => {
          console.error("Error al cerrar sesión:", error.message);
        });
    },
  },
});
</script>
