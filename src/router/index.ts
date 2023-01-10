import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "catalog",
    component: () => import("@/pages/CatalogPage.vue"),
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: () => import("@/pages/WishlistPage.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/pages/CartPage.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/pages/ProductPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
