<template>
  <div>
    <app-loader :is-loading="cartStore.getIsCartLoading"></app-loader>
    <div v-if="cartStore.getProducts.length" class="cart">
      <cart-products-list-item
        v-for="product in cartStore.getProducts"
        :product="product"
        :key="product.id"
      >
      </cart-products-list-item>

      <div class="cart__row d-flex justify-end font-weight-bold text-h6">
        <div class="text-right ma-1 pa-1">Итого:</div>
        <div class="cart__price ma-1 pa-1 text-right">
          <app-formatted-price
            :price="cartStore.getTotals.price"
          ></app-formatted-price>
        </div>
      </div>

      <div class="text-right mt-5">
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
