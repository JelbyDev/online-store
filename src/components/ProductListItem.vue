<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 5 : 2"
      :class="{ 'on-hover': isHovering }"
      :to="`/product/${product.id}`"
      class="rounded-lg"
      v-bind="props"
    >
      <v-img :src="product.img" height="270" position="center center" cover>
        <v-overlay
          :model-value="isHovering"
          contained
          class="align-center justify-center"
        >
          <v-btn flat>Перейти</v-btn>
        </v-overlay>
      </v-img>

      <v-card-title>
        <app-formatted-price :price="product.price"></app-formatted-price>
      </v-card-title>

      <v-card-subtitle>{{ product.name }}</v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>

        <product-add-to-wishlist-button
          @click.prevent
          :productId="product.id"
        ></product-add-to-wishlist-button>

        <product-add-to-cart-button
          @click.prevent
          :product="product"
        ></product-add-to-cart-button>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ProductAddToCartButton from "@/components/ProductAddToCartButton.vue";
import ProductAddToWishlistButton from "@/components/ProductAddToWishlistButton.vue";

export default defineComponent({
  name: "product-list-item",
  components: { ProductAddToCartButton, ProductAddToWishlistButton },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.v-card {
  cursor: pointer;

  .v-img__img {
    transition: transform 0.5s;
  }

  &.on-hover {
    & .v-img__img {
      transform: scale(1.2);
    }
  }
}
</style>
