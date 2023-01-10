<script setup lang="ts">
import { Product } from "@/types";
import { defineProps, withDefaults } from "vue";
import ProductsListItem from "@/components/ProductsListItem.vue";

withDefaults(
  defineProps<{
    products: Product[];
    isLoadingProducts?: boolean;
    gridCools?: number;
    gridSm?: number;
    gridMd?: number;
    gridLg?: number;
  }>(),
  {
    isLoadingProducts: false,
    gridCools: 0,
    gridSm: 0,
    gridMd: 0,
    gridLg: 0,
  }
);
</script>

<template>
  <div
    class="product-list"
    :class="{ 'product-list__loading': isLoadingProducts }"
  >
    <app-loader :is-loading="isLoadingProducts"></app-loader>
    <v-row v-if="products.length">
      <v-col
        v-for="product in products"
        :key="product.id"
        :cols="gridCools"
        :sm="gridSm"
        :md="gridMd"
        :lg="gridLg"
      >
        <products-list-item :product="product"></products-list-item>
      </v-col>
    </v-row>

    <app-no-products-text v-else-if="!isLoadingProducts">
      Товары не найдены...
    </app-no-products-text>
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  position: relative;
  width: 100%;

  &__loading {
    height: 100%;
    min-height: 200px;
  }
}
</style>
