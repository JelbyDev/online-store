<template>
  <v-fade-transition
    v-if="products.length > 0"
    tag="div"
    class="d-flex flex-wrap"
    leave-absolute
    group
  >
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

            <app-add-product-to-wishlist
              @click.prevent
              :productId="product.id"
            ></app-add-product-to-wishlist>

            <app-add-product-to-cart
              @click.prevent
              :product="product"
            ></app-add-product-to-cart>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-fade-transition>
  <div v-else>Товары не найдены...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "product-list",
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
