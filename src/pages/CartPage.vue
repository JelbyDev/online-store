<template>
  <div>
    <app-page-title>Корзина товаров</app-page-title>

    <div v-if="cartStore.getProducts.length" class="cart">
      <div
        v-for="product in cartStore.getProducts"
        :key="product.id"
        class="cart__row d-flex align-center"
      >
        <div class="ma-1 pa-1">
          <v-btn
            @click="cartStore.removeProduct(product.id)"
            icon="mdi-close"
            size="x-small"
            color="error"
          ></v-btn>
        </div>
        <div class="cart__image ma-1 pa-1">
          <v-img
            :src="product.img"
            height="100px"
            position="center center"
          ></v-img>
        </div>
        <div class="flex-sm-grow-1 ma-1 pa-1">
          {{ product.name }}
        </div>
        <div class="cart__quantity d-flex justify-center ma-1 pa-1">
          <div class="d-flex align-center">
            <v-btn
              icon="mdi-minus"
              size="x-small"
              color="info"
              class="mr-2"
            ></v-btn>
            <v-text-field
              v-model.lazy.number="product.cartQuantity"
              variant="outlined"
              density="compact"
              @change="
                cartStore.addProduct(product, product.cartQuantity, true)
              "
              hide-details
            >
            </v-text-field>
            <v-btn
              icon="mdi-plus"
              size="x-small"
              color="info"
              class="ml-2"
            ></v-btn>
          </div>
        </div>
        <div class="cart__price ma-1 pa-1 text-right">
          <app-formatted-price
            :price="product.cartTotalPrice"
          ></app-formatted-price>
        </div>
      </div>
      <div class="cart__row d-flex justify-end font-weight-bold text-h6">
        <div class="text-right ma-1 pa-1">Итого:</div>
        <div class="cart__price ma-1 pa-1 text-right">
          <app-formatted-price
            :price="cartStore.getTotals.price"
          ></app-formatted-price>
        </div>
      </div>
    </div>
    <div v-else>Нет добавленных товаров...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  name: "cart-products",
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
});
</script>

<style lang="scss">
.cart {
  &__row {
    border-top: 1px solid #ccc;
    padding: 0 0.7rem;

    &:hover {
      background: #f7f7f7;
    }
  }
  &__image {
    width: 140px;
  }
  &__quantity {
    & input[type="text"] {
      background: #fff;
    }
  }
  &__price {
    min-width: 100px;
  }
}
</style>
