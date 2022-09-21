import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Create from "../views/Create.vue";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    beforeEnter: guardMyroute,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  const checkToken = localStorage.getItem("token")
  if (checkToken != null)
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

export default router;
