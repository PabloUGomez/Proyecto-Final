<template>
  <li>
    <article class="mb-6 rounded-lg bg-slate-100 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div>
            <h3 class="text-base font-semibold text-gray-900">
              {{ tarea.titulo }}
            </h3>
            <span class="block text-xs font-normal text-gray-500">{{
              tarea.categoria
            }}</span>
          </div>
        </div>
        <div class="flex items-center" @click="marcarCompletada">
          <div
            class="animate-fade animate-once animate-ease-out animate-normal flex items-center justify-center animate-duration-500 bg-indigo-100 p-2 rounded-lg"
            v-if="!tarea.completada"
          >
            <p class="text-sm font-medium text-indigo-500 p-2">Finalizar</p>

            <FinalizarIcon />
          </div>
          <div
            class="animate-fade animate-once animate-ease-out animate-normal animate-duration-500 flex items-center justify-center bg-green-100 p-2 rounded-lg"
            v-if="tarea.completada"
          >
            <p class="text-sm font-medium text-green-500 p-2">Completada</p>

            <CompletadaIcon />
          </div>
        </div>
      </div>
      <p class="my-6 text-sm font-normal text-gray-500">
        {{ tarea.descripcion }}
      </p>
      <div
        class="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900"
      >
        <div class="flex items-center">
          <FechaIcon />
          <span class="mr-1">Fecha: {{ tarea.fecha }}</span>
        </div>
        <div
          class="flex items-center gap-3"
          @click="marcarFavorita"
        >
          <div v-if="!tarea.favorita" class="mr-1">
            <NoFavoritoIcon
              class="animate-fade animate-once animate-ease-out animate-normal flex items-center justify-center animate-duration-500"
            />
          </div>

          <div v-if="tarea.favorita">
            <FavoritoIcon
              class="animate-fade animate-once animate-ease-out animate-normal animate-duration-500"
            />
          </div>
          <div
            class="mr-2 p-2 rounded-lg hover:bg-red-100 cursor-pointer"
            @click="borrarTarea"
          >
            <BorrarIcon />
          </div>
        </div>
      </div>
    </article>
  </li>
</template>

<script lang="ts">
import FinalizarIcon from "../icons/FinalizarIcon.vue";
import FavoritoIcon from "../icons/FavoritoIcon.vue";
import CompletadaIcon from "../icons/CompletadaIcon.vue";
import BorrarIcon from "../icons/BorrarIcon.vue";
import FechaIcon from "../icons/FechaIcon.vue";
import NoFavoritoIcon from "../icons/NoFavoritoIcon.vue";

export default {
  components: {
    FinalizarIcon,
    FavoritoIcon,
    CompletadaIcon,
    BorrarIcon,
    FechaIcon,
    NoFavoritoIcon,
  },
  props: {
    tarea: {
      type: Object as () => {
        _id: number;
        titulo: string;
        categoria: string;
        descripcion: string;
        fecha: Date;
        completada: boolean;
        favorita: boolean;
      },
      required: true,
    },
  },
  methods: {
    marcarCompletada() {
      this.$emit("completar-tarea", this.tarea._id);
    },
    marcarFavorita() {
      this.$emit("favorita-tarea", this.tarea._id);
    },
    borrarTarea() {
      this.$emit("borrar-tarea", this.tarea._id);
    },
  },
};
</script>
