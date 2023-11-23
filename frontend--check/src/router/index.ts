import Vue from "vue";
import VueRouter, {NavigationGuard} from "vue-router";
import {auth} from "../firebaseConfig";

import Registro from "../views/Registro.vue";
import Tareas from "../views/Tareas.vue";

Vue.use(VueRouter);

const requireAuth: NavigationGuard = (to, from, next) => {
  const user = auth.currentUser;
  if (!user) {
    next({name: "login"});
  } else {
    next();
  }
}


const routes = [
    {
      path: "/",
      name: "registro",
      component: Registro,
    },
    {
      path: "/Login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/Tareas",
      name: "tareas",
      component: Tareas,
      beforeEnter: requireAuth as NavigationGuard,
    },
  ]


const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
