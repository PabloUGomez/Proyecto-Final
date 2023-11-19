import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";

import App from "./App.vue";
import router from "./router";

import TareaListar from "./views/Tasks/TareaListar.vue";

Vue.use(VueCompositionAPI);

Vue.component("tarea-listar", TareaListar);

const app = createApp({
  router,
  render: () => h(App),
});

app.mount("#app");
