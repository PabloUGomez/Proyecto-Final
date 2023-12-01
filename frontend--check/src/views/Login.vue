
<template>
    <main class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <form class="flex w-[30rem] flex-col space-y-10" @submit.prevent="iniciarSesion">
            <div class="text-center text-4xl font-medium">Iniciar sesion</div>
            <div
                class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
                <input
                    type="text"
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
            Iniciar secion
            </button>
            <a
                href="#"
                class="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
            >OLVIDASTE TU CONTRASEÑA?
            </a>
            <p class="text-center text-lg">
                No tenes cuenta?
                <router-link
                    to="/"
                    class="font-medium text-indigo-500 underline-offset-4 hover:underline"
                >
                    Crea una
                </router-link>
            </p>
        </form>
        <AlertaError v-if="error" :texto='textoAlerta'/>
    </main>
</template>

<script lang="ts">
    import '../assets/main.css'
    import  Vue from 'vue';
    import {auth} from '../firebaseConfig';
    import {signInWithEmailAndPassword } from 'firebase/auth'
    import AlertaError from '../components/AlertaError.vue'

    export default Vue.extend({
        data() {
            return {
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
            iniciarSesion() {                 
            signInWithEmailAndPassword(auth, this.email,this.password)
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
