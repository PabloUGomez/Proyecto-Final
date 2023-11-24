<template>
  <li>
    <div class="mb-6 rounded-lg bg-slate-100 p-6">
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
        <div class="flex items-center" >
          <label class="swap">
            <!-- Checkbox oculta para manejar estados -->
            <input type="checkbox" @click="marcarCompletada">/>

            <div
              class="swap-off animate-fade animate-once animate-ease-out animate-normal flex items-center justify-center animate-duration-500 bg-indigo-100 p-2 rounded-lg"
            >
              <p class="text-sm font-medium text-indigo-500 p-2">Finalizar</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-calendar-plus text-indigo-400 stroke-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"
                />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
              </svg>
            </div>

            <div
              class="swap-on animate-fade animate-once animate-ease-out animate-normal animate-duration-500 flex items-center justify-center bg-green-100 p-2 rounded-lg"
            >
              <p class="text-sm font-medium text-green-500 p-2">Completada</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-check text-green-600 stroke-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </div>
          </label>
        </div>
      </div>
      <p class="my-6 text-sm font-normal text-gray-500">
        {{ tarea.description }}
      </p>
      <div
        class="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900"
      >
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5 text-base text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
          <span class="mr-1">Fecha: {{ formatearFecha(tarea.fecha) }}</span>
        </div>
        <div class="flex items-center gap-3">
          <label class="swap">
            <!-- Checkbox favorita -->
            <input type="checkbox"  @click="marcarFavorita"/>

            <div
              class="swap-off animate-fade animate-once animate-ease-out animate-normal flex items-center justify-center animate-duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-400 stroke-current"
                viewBox="0 0 20 20"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z "
                />
              </svg>
            </div>

            <div
              class="swap-on animate-fade animate-once animate-ease-out animate-normal animate-duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-indigo-400 fill-current"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </label>
          <div class="mr-2 p-2 rounded-lg hover:bg-red-100 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash text-red-600 stroke-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
export default {
  props: {
    tarea: {
      type: Object as () => {
        id: number;
        titulo: string;
        categoria: string;
        description: string;
        fecha: Date;
        completada: boolean;
        favorita: boolean;
      },
      required: true,
    },
  },
  methods: {
    formatearFecha(fecha: Date) {
      const opcionesDeFormato = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      return fecha.toLocaleString("es-AR", opcionesDeFormato as any);
    },
    marcarCompletada() {
      this.$emit("completar-tarea", this.tarea.id);
    },
    marcarFavorita() {
      this.$emit("favorita-tarea", this.tarea.id);
    },
  },
};
</script>
