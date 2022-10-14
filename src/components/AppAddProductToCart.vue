<template>
  <v-btn
    @click="cartStore.addProduct(product, quantity, updateQuantity)"
    :color="cartStore.isInCart(product.id) ? 'green' : 'surface-variant'"
    size="small"
    variant="tonal"
    icon="mdi-cart-arrow-down"
  ></v-btn>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  name: "app-add-product-to-cart",
  props: {
    product: {
      type: Object,
      required: true,
      validator: (value) => {
        return value as Product;
      },
    },
    quantity: {
      type: Number,
      default: 1,
    },
    updateQuantity: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
});
</script>

<style scoped></style>
