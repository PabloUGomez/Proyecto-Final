<script setup lang="ts">

import './assets/main.css'

</script>

<template>
  <div id="app" class="h-full w-full">
      <router-link to="/">Registro</router-link> |
      <router-link to="/Login">Login</router-link> |
      <router-link to="/Tareas">Tareas</router-link> |
    <router-view />
  </div>
</template>

<style>
</style>
