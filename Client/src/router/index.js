import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: false},
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    //component: Dashboard
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
    meta: { requireAuth: true, requiredlevel: 1 },
  },
  {
    path: "/Patients",
    name: "Patiens",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Patients.vue"),
    meta: { requireAuth: true, requiredlevel: 3 },
  },
  {
    path: "/Music",
    name: "Music",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Music.vue"),
    meta: { requireAuth: true, requiredlevel: 2 },
  },
  {
    path: "/Playlists",
    name: "Playlists",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Playlists.vue"),
    meta: { requireAuth: true, requiredlevel: 2 },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getLevel >= to.meta.requiredlevel) {
      console.log("genoeg level");
      next();
    } else {
      console.log("nub");
      next({ name: "Home" });
    }
  } else {
    console.log("niets nodig");
    next();
  }
});

// console.log("geen auth nodig");
// console.log(store);
// console.log(store.getters.getName)

export default router;
