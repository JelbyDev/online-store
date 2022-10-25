<template>
  <v-sheet border rounded class="pa-5">
    <v-row dense class="justify-space-between">
      <v-col cols="auto">
        <app-formatted-price
          class="text-h4 font-weight-bold"
          :price="product.price"
        ></app-formatted-price>
      </v-col>

      <v-col cols="auto">
        <product-add-to-wishlist-button
          :productId="product.id"
        ></product-add-to-wishlist-button>
      </v-col>
    </v-row>

    <product-add-to-cart-button
      :product="product"
      :text="cartStore.isInCart(product.id) ? 'Добавить еще' : 'В корзину'"
      size="large"
    ></product-add-to-cart-button>
  </v-sheet>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, PropType } from "vue";
import { useCartStore } from "@/stores/cart";
import ProductAddToCartButton from "@/components/ProductAddToCartButton.vue";
import ProductAddToWishlistButton from "@/components/ProductAddToWishlistButton.vue";

export default defineComponent({
  components: {
    ProductAddToCartButton,
    ProductAddToWishlistButton,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
});
</script>
