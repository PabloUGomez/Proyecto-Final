<template>
  <transition name="fade" mode="out-in">
    <li>
      <article class="mb-6 rounded-lg bg-slate-100 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div>
              <h3 class="text-base font-semibold text-gray-900">
                {{ tarea.titulo }}
              </h3>
              <span class="block text-xs font-normal text-gray-500">{{ tarea.categoria }}</span>
            </div>
          </div>
          <div class="flex items-center" @click="marcarCompletada">
            <div
              class="flex items-center justify-center bg-indigo-100 p-2 rounded-lg animate-fade animate-once animate-ease-out animate-normal animate-duration-500"
              v-if="!tarea.completada"
            >
              <p class="text-sm font-medium text-indigo-500 p-2">Finalizar</p>
              <FinalizarIcon />
            </div>
            <div
              class="flex items-center justify-center bg-green-100 p-2 rounded-lg"
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
        <div class="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
          <div class="flex items-center">
            <FechaIcon />
            <span class="mr-1">Fecha: {{ tarea.fecha }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div @click="marcarFavorita">
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
            </div>
            <div
              class="p-1 rounded-lg hover:bg-red-100 cursor-pointer"
              @click="borrarTarea"
            >
              <BorrarIcon />
            </div>
            <div
              class="p-1 rounded-lg hover:bg-gray-300 cursor-pointer"
              @click="editarTarea"
            >
              <EditarIcon />
            </div>
          </div>
        </div>        
      </article>
    </li>
  </transition>
</template>

<script lang="ts">
import FinalizarIcon from "../icons/FinalizarIcon.vue";
import FavoritoIcon from "../icons/FavoritoIcon.vue";
import CompletadaIcon from "../icons/CompletadaIcon.vue";
import BorrarIcon from "../icons/BorrarIcon.vue";
import FechaIcon from "../icons/FechaIcon.vue";
import NoFavoritoIcon from "../icons/NoFavoritoIcon.vue";
import EditarIcon from "../icons/EditarIcon.vue";

export default {
  components: {
    FinalizarIcon,
    FavoritoIcon,
    CompletadaIcon,
    BorrarIcon,
    FechaIcon,
    NoFavoritoIcon,
    EditarIcon,
  },
  props: {
    tarea: {
      type: Object as () => {
        _id: string;
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
    editarTarea() {
      this.$emit(
        "editar-tarea",
        this.tarea._id,
        this.tarea.titulo,
        this.tarea.categoria,
        this.tarea.descripcion
      );
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
