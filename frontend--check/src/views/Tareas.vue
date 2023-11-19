<script>
import "../assets/main.css"
import ListaTareas from '../components/ListaTareas.vue';

export default {
components: {
    ListaTareas,
},
    data() {
        return {
            tareas: [
                {
                id: 1,
                name: 'Hacer la compra',
                description: 'Comprar alimentos y productos de primera necesidad.',
                dueDate: new Date('2023-12-31'),
                completed: false,
                },
                {
                id: 2,
                name: 'Hacer ejercicio',
                description: 'Realizar ejercicio físico durante al menos 30 minutos.',
                dueDate: new Date('2023-12-31'),
                completed: false,
                },
                {
                id: 3,
                name: 'Leer un libro',
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
        <ListaTareas class="mx-auto flex min-h-screen w-full items-center justify-center" :tareas="tareas"></ListaTareas>
    </main>
</template>