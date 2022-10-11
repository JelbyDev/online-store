<template>
  <v-row v-if="products.length > 0">
    <v-col
      v-for="product in products"
      :key="product.id"
      :cols="gridCools"
      :sm="gridSm"
      :md="gridMd"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          :elevation="isHovering ? 5 : 2"
          :class="{ 'on-hover': isHovering }"
          class="rounded-lg"
          v-bind="props"
          :href="`#/product/${product.id}`"
        >
          <v-img :src="product.img" height="270" position="center center" cover>
            <!--<v-overlay
              :model-value="isHovering"
              contained
              class="align-center justify-center"
            >
              <v-btn prepend-icon="mdi-magnify" flat>Подробнее</v-btn>
            </v-overlay> -->
          </v-img>

          <v-card-title>
            <app-formatted-price :price="product.price"></app-formatted-price>
          </v-card-title>

          <v-card-subtitle>{{ product.name }}</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              @click="wishlistStore.toggleProduct(product.id)"
              :color="
                wishlistStore.isInWishlist(product.id)
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
                cartStore.isInCart(product.id) ? 'green' : 'surface-variant'
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
  <div v-else>Товары не найдены...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  props: {
    products: {
      type: Object,
      required: true,
    },
    gridCools: {
      type: Number,
      default: 0,
    },
    gridSm: {
      type: Number,
      default: 0,
    },
    gridMd: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    return {
      cartStore,
      wishlistStore,
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
