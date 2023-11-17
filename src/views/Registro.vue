
<template>
  <main>
    <form action="#" @submit.prevent="registrar">
        <h2>Registro</h2>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required v-model="nombre" >

        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required v-model="email">

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required v-model="password">

        <input type="submit" value="Registrar">
    </form>
  </main>
</template>

<script lang="ts">
    import  Vue from 'vue';
    import {auth} from '../firebaseConfig';
    import {createUserWithEmailAndPassword} from 'firebase/auth'

    type User = {
        nombre: string,
        email: string,
        password: string,
    };
    export default Vue.extend({
        data() : User{
            return {
                nombre: '',
                email: '',
                password: '',
            };
        },
        methods: {
            registrar() { 
            //validaciones extra           
            createUserWithEmailAndPassword(auth, this.email,this.password)
            .then ((credenciales)=>{
                const user = credenciales.user;
                console.log(user);
            })
            .catch((error)=>{
                console.log(error);
            });
            },
        },
        });
</script>


<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    form {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
        box-sizing: border-box;
    }

    h2 {
        text-align: center;
        color: #333;
    }

    label {
        color: #555;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    input[type="submit"] {
        background-color: #4caf50;
        color: #fff;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: #45a049;
    }

    a {
        color: #065fd4;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
