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
      :lg="gridLg"
    >
      <product-list-item :product="product"></product-list-item>
    </v-col>
  </v-fade-transition>
  <div v-else>Товары не найдены...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ProductListItem from "@/components/ProductListItem.vue";

export default defineComponent({
  name: "product-list",
  components: { ProductListItem },
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
    gridLg: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style lang="scss"></style>
