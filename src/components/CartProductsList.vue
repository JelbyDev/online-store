<template>
  <div>
    <app-loader :is-loading="cartStore.getIsCartLoading"></app-loader>
    <div v-if="cartStore.getProducts.length">
      <v-scroll-x-transition group>
        <cart-products-list-item
          v-for="product in cartStore.getProducts"
          :product="product"
          :key="product.id"
        >
        </cart-products-list-item>
      </v-scroll-x-transition>

      <div
        class="d-flex justify-center justify-sm-end font-weight-bold text-h6 py-2"
      >
        <div class="text-right ma-1 pa-1">Итого:</div>
        <div class="ma-1 pa-1 text-right">
          <app-formatted-price
            :price="cartStore.getTotals.price"
          ></app-formatted-price>
        </div>
      </div>

      <div class="text-center text-sm-right">
        <slot name="orderFormButton"></slot>
      </div>
    </div>

    <app-no-products-text v-else-if="!cartStore.getIsCartLoading">
      Нет добавленных товаров...
    </app-no-products-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";
import CartProductsListItem from "@/components/CartProductsListItem.vue";

export default defineComponent({
  components: { CartProductsListItem },
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
});
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
