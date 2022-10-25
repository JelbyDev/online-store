<template>
  <div class="cart__row d-flex align-center">
    <div class="ma-1 pa-1">
      <v-btn
        @click="cartStore.removeProduct(product.id)"
        icon="mdi-close"
        size="x-small"
        color="error"
      ></v-btn>
    </div>

    <div class="cart__image ma-1 pa-1">
      <v-img :src="product.img" height="100px" position="center center"></v-img>
    </div>

    <div class="flex-sm-grow-1 ma-1 pa-1">
      {{ product.name }}
    </div>

    <div class="cart__quantity d-flex flex-wrap justify-center ma-1 pa-1">
      <div class="d-flex align-center">
        <v-btn
          @click="cartStore.addProduct(product, product.cartQuantity - 1, true)"
          icon="mdi-minus"
          size="x-small"
          color="info"
          class="mr-2"
        ></v-btn>

        <v-text-field
          @change="cartStore.addProduct(product, product.cartQuantity, true)"
          :model-value="product.cartQuantity"
          variant="outlined"
          density="compact"
          hide-details
        >
        </v-text-field>

        <v-btn
          @click="cartStore.addProduct(product, product.cartQuantity + 1, true)"
          icon="mdi-plus"
          size="x-small"
          color="info"
          class="ml-2"
        ></v-btn>
      </div>

      <div class="w-100 text-center text-subtitle-2">
        Доступно {{ product.quantity }} шт.
      </div>
    </div>

    <div class="cart__price ma-1 pa-1 text-right">
      <app-formatted-price
        :price="product.cartTotalPrice"
      ></app-formatted-price>
    </div>
  </div>
</template>

<script lang="ts">
import { CartProduct } from "@/types";
import { defineComponent, PropType } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<CartProduct>,
      required: true,
    },
  },
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
    max-width: 150px;

    & input[type="text"] {
      background: #fff;
    }
  }
  &__price {
    min-width: 100px;
  }
}
</style>
