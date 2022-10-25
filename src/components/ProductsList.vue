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

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, PropType } from "vue";
import ProductsListItem from "@/components/ProductsListItem.vue";

export default defineComponent({
  components: { ProductsListItem },
  props: {
    products: {
      type: Object as PropType<Product[]>,
      required: true,
    },
    isLoadingProducts: {
      type: Boolean,
      default: false,
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
    gridLg: {
      type: Number,
      default: 0,
    },
  },
});
</script>

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
