<script lang="ts">
import "../assets/main.css"
import ListaTareas from '../components/ListaTareas.vue';
import Header from '../components/Header.vue';

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
                name: 'Hacer la compra',
                categoria: 'Evento',
                description: 'Comprar alimentos y productos de primera necesidad.',
                dueDate: new Date('2023-12-31'),
                completed: false,
                },
                {
                id: 2,
                name: 'Hacer ejercicio',
                categoria: 'Deportes',
                description: 'Realizar ejercicio físico durante al menos 30 minutos.',
                dueDate: new Date('2023-12-31'),
                completed: false,
                },
                {
                id: 3,
                name: 'Leer un libro',
                categoria: 'Entretenimiento',
                description: 'Leer al menos un capítulo de un libro interesante.',
                dueDate: new Date('2023-12-31'),
                completed: false,
                },
            ],
        };
    },
};

</script>
<template>
    <main class=" bg-gray-900">
        <Header></Header>
        <ListaTareas class="mx-auto flex min-h-screen w-full items-center justify-center" :tareas="tareas"></ListaTareas>
    </main>
</template>