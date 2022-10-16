<template>
  <div>
    <app-loader :is-loading="isLoadingProduct"></app-loader>
    <div v-if="product.id" class="mt-3">
      <v-row class="mt-3">
        <v-col cols="12" md="4">
          <v-img :src="product.img" position="center center" cover></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <app-page-title>{{ product.name }}</app-page-title>
          <v-list>
            <v-list-item-title>
              Категория: {{ product.category }}
            </v-list-item-title>
            <v-list-item-title> Размер: {{ product.size }} </v-list-item-title>
            <v-list-item-title> Цвет: {{ product.color }} </v-list-item-title>
            <v-list-item-title>
              В наличии: {{ product.quantity }}
            </v-list-item-title>
          </v-list>

          <app-formatted-price :price="product.price"></app-formatted-price>

          <app-add-product-to-wishlist
            :productId="product.id"
          ></app-add-product-to-wishlist>

          <app-add-product-to-cart :product="product"></app-add-product-to-cart>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct } from "@/api/Products";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const product = ref({} as Product);
    const isLoadingProduct = ref(true);

    onMounted(() => {
      const productId = +route.params.id;
      getProduct(productId)
        .then((response) => {
          if (response === undefined) {
            router.push("/not-found");
          } else {
            product.value = { ...response };
          }
        })
        .finally(() => {
          isLoadingProduct.value = false;
        });
    });

    return {
      product,
      isLoadingProduct,
    };
  },
});
</script>

<style lang="scss"></style>
