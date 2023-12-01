<template>
    <div class="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black">
        <div class=" flex justify-center items-center w-full h-full mt-12">
          <form class="relative flex-col bg-slate-400 mb-6 rounded-lg p-6 w-4/5 md:w-1/2" @submit.prevent="enviarDatos">
            <div class="mb-5">
              <label
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Titulo
              </label>
              <input
              id="titulo"
              v-model="titulo"
              type="text"
              placeholder="Titulo"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              required
              />
            </div>
            <div class="mb-5">
              <label
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Categoria
              </label>
              <select
                id="categoria"
                v-model="categoria"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option selected value="Evento">Evento</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Deportes">Deportes</option>
            </select>
            
            </div>
            <div class="mb-5">
              <label
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Descripcion
              </label>
              <textarea
                rows="4"
                id="descripcion"
                v-model="descripcion"
                placeholder="Escribe tu descripcion"
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"              
                >
                Submit
              </button>
              <button
              class="hover:shadow-form rounded-md bg-[#f16964] ml-3 py-3 px-8 text-base font-semibold text-white outline-none"
              @click="cerrar"
              >
              Cancelar
            </button>
            </div>
          </form>
        </div>
      </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      tareaAEditar: {
        type: Object as () => {
          _id: string;
          titulo: string;
          categoria: string;
          descripcion: string;
        },
        required: true,
      },
    },
    data() {
    return {
      titulo: '',
      categoria: 'Evento',
      descripcion: '',
    };
    },
    mounted() {
      this.titulo = this.tareaAEditar.titulo;
      this.categoria = this.tareaAEditar.categoria;
      this.descripcion = this.tareaAEditar.descripcion;
    },
    methods: {
      cerrar() {
        this.$emit('cerrar');
      },
      enviarDatos() {             
        this.$emit('enviarDatos', {
        _id: this.tareaAEditar._id,
        titulo: this.titulo,
        categoria: this.categoria,
        descripcion: this.descripcion,
      });
      this.cerrar();
      },
    },
  };
  </script>
  
