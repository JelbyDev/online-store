<template>
  <div>
    <h1 class="text-h3">{{ title }}</h1>

    <v-row class="mt-3">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="5"
        md="4"
        lg="3"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            :elevation="isHovering ? 5 : 2"
            :class="{ 'on-hover': isHovering }"
            class="rounded-lg"
            v-bind="props"
          >
            <v-img
              :src="product.img"
              height="270"
              position="center center"
              cover
            >
              <v-overlay
                :model-value="isHovering"
                contained
                class="align-center justify-center"
              >
                <v-btn prepend-icon="mdi-magnify" flat>Подробнее</v-btn>
              </v-overlay>
            </v-img>

            <v-card-title>{{ product.price }} руб.</v-card-title>
            <v-card-subtitle>{{ product.name }}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="wishlistStore.toggleProduct(product.id)"
                :color="
                  wishlistStore.checkProduct(product.id)
                    ? 'green'
                    : 'surface-variant'
                "
                size="small"
                variant="tonal"
                icon="mdi-heart"
              ></v-btn>

              <v-btn
                @click="cartStore.addProduct(product.id)"
                :color="
                  cartStore.checkProduct(product.id)
                    ? 'green'
                    : 'surface-variant'
                "
                size="small"
                variant="tonal"
                icon="mdi-cart-arrow-down"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getProducts } from "@/api/Products";
import { Product } from "@/types";

import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    const products = ref([] as Product[]);
    getProducts().then((prod) => {
      products.value = [...prod];
    });

    return {
      cartStore,
      wishlistStore,
      title: "Каталог",
      products,
    };
  },
});
</script>

<style lang="scss">
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
