import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CatalogPage from "@/pages/CatalogPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "catalog",
    component: CatalogPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
