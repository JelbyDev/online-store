<template>
  <div style="max-width: 990px">
    <v-row v-for="product in products" :key="product.id">
      <v-col cols="2">
        <v-img :src="product.img" height="150" position="center center"></v-img>
      </v-col>
      <v-col cols="7">
        {{ product.name }}
      </v-col>
      <v-col cols="2"> {{ product.price }} руб. </v-col>
      <v-col cols="1">
        {{ product.quantity }}
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, ref, onMounted } from "vue";
import { getProducts } from "@/api/Products";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const products = ref([] as Array<Product & { quantity: number }>);

    onMounted(() => {
      const productsQuantity = cartStore.getProducts();
      const productsId = Object.keys(productsQuantity).map(
        (productId) => +productId
      );
      getProducts(undefined, undefined, undefined, { ids: productsId }).then(
        (response) => {
          response.products.forEach((product) => {
            const cartProductQuantity = productsQuantity[product.id];
            const cartProduct = { ...product, quantity: +cartProductQuantity };
            products.value.push(cartProduct);
          });
        }
      );
    });

    return { products };
  },
});
</script>

<style scoped></style>
