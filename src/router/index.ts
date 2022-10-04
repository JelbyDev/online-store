import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CatalogView from "@/views/CatalogView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "catalog",
    component: CatalogView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
