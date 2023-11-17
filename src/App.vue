<script setup lang="ts">
import router from './router';

</script>

<template>
  <div id="app">
    <router-link to="/">Registro</router-link> |
    <router-link to="/Login">Login</router-link> |
    <router-view />
  </div>
</template>

<style>
</style>
