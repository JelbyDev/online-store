<template>
  <div>
    <app-loader :is-loading="isLoadingProduct"></app-loader>
    <div v-if="product.id">
      <app-page-title>{{ product.name }}</app-page-title>

      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-img :src="product.img" align="top center" height="300" cover>
          </v-img>
        </v-col>

        <v-col cols="12" sm="6" md="8">
          <v-row class="align-center">
            <v-col cols="12" md="6">
              <product-options :options="optionsList"></product-options>
            </v-col>

            <v-col cols="12" md="6">
              <product-cart-block :product="product"></product-cart-block>
            </v-col>

            <v-col cols="12">
              {{ product.description }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useProductSingle } from "@/hooks/useProductSingle";
import ProductOptions from "@/components/ProductOptions.vue";
import ProductCartBlock from "@/components/ProductCartBlock.vue";

export default defineComponent({
  components: {
    ProductOptions,
    ProductCartBlock,
  },
  setup() {
    const route = useRoute();
    const productId = +route.params.id;
    const { product, optionsList, isLoadingProduct } =
      useProductSingle(productId);

    return {
      product,
      isLoadingProduct,
      optionsList,
    };
  },
});
</script>
