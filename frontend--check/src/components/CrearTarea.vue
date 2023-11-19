<template>
    <div class="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black">
        <div class=" flex justify-center items-center w-full h-full mt-12">
          <form action="https://formbold.com/s/FORM_ID" method="POST" class="relative flex-col bg-slate-400 mb-6 rounded-lg p-6 w-4/5 md:w-1/2" >
            <div class="mb-5">
              <label
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Titulo
              </label>
              <input
              id="titulo"
              type="text"
              placeholder="Titulo"
              v-model="nombre"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                placeholder="example@domain.com"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="Evento">Evento</option>
                <option value="Entretenimiento">Entretenimiento</option>
            </select>
            
            </div>
            <div class="mb-5">
              <label
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
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
                placeholder="Escribe tu descripcion"
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button
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
  
  <script>
  export default {
    methods: {
      cerrar() {
        this.$emit('cerrar');
      },
    },
  };
  </script>
  
