<template>
  <div><TareaListar :text="text" /></div>
</template>

<script>
import TareaListar from "./Tasks/TareaListar.vue";

export default {
  components: {
    TareaListar,
  },
  data() {
    return {
      text: "hola",
    };
  },
};
</script>
