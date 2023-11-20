<template>
    <header class="bg-gray-800 mb-6">
        <div class="py-3 px-6">
            <div class="flex justify-between">
                <div class="flex items-center">
                    <span class="ml-2 font-semibold text-gray-100"> {"Logo"}Administrador de tareas
                    </span>
                </div>
                <div class="ml-2 flex">
                    <div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-sm font-medium text-gray-100">Completadas</span>
                    </div>
                    <div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-sm font-medium text-gray-100">Favoritas</span>
                    </div>
                    <div class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-indigo-600">
                        <span class="text-sm font-medium text-gray-100">Cerrar sesion</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-x-2 pt-4 px-2 items-center">        
                <div class="flex flex-1 gap-x-3">
                    <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-gray-700 py-2 px-4 text-white hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span class="text-sm font-medium">Categories</span>
                    </div>
                </div>
            </div>
        </div>
    </header> 
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});

</script>