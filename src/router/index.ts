import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CatalogPage from "@/pages/CatalogPage.vue";
import WishlistPage from "@/pages/WishlistPage.vue";
import CartPage from "@/pages/CartPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "catalog",
    component: CatalogPage,
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: WishlistPage,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductPage,
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
