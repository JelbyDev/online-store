import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
