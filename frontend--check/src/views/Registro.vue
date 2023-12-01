
<template>
    <main class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <form  class="flex w-[30rem] flex-col space-y-10" @submit.prevent="registrar">
            <div class="text-center text-4xl font-medium">Crea una cuenta</div>
            <div
                class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
                <input
                    type="text"
                    placeholder="Nombre"
                    v-model="nombre"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                />
            </div>
            <div
                class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
                <input
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                />
            </div>
            <div
                class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                />
            </div>
            <button
                class="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
                type="submit"
                >
            Registrarse
            </button>
            <p class="text-center text-lg">
                Ya tienes cuenta?
                <router-link
                    to="/Login"
                    class="font-medium text-indigo-500 underline-offset-4 hover:underline"
                >
                    Inicia sesión
                </router-link>
            </p>
        </form>
        <Alerta v-if="error" :texto='textoAlerta'/>
    </main>
</template>

<script lang="ts">
    import  Vue from 'vue';
    import {auth} from '../firebaseConfig';
    import {createUserWithEmailAndPassword} from 'firebase/auth'
    import AlertaError from '../components/AlertaError.vue'

    export default Vue.extend({
        data() {
            return {
                nombre: '',
                email: '',
                password: '',
                error: false,
                textoAlerta: 'Credenciales invalidas, intenta nuevamente.',
            };
        },
        components: {
            AlertaError,
        },
        methods: {
            registrar() { 
            //validaciones extra           
            createUserWithEmailAndPassword(auth, this.email,this.password)
            .then (()=>{
                this.$router.push('/Tareas')
            })
            .catch(()=>{
                this.error = true
                setTimeout(() => {
                    this.error = false
                }, 3000);
            });
            },
        },
        });
</script>
