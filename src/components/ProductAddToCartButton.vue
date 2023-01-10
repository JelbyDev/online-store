<script setup lang="ts">
import { Product } from "@/types";
import { defineProps, withDefaults } from "vue";
import { useCartStore } from "@/stores/cart";

withDefaults(
  defineProps<{
    product: Product;
    quantity?: number;
    updateQuantity?: boolean;
    size?: string;
    text?: string;
  }>(),
  {
    quantity: 1,
    updateQuantity: false,
    size: "small",
    text: "",
  }
);

const cartStore = useCartStore();
</script>

<template>
  <v-btn
    v-if="text"
    @click="cartStore.addProduct(product, quantity, updateQuantity)"
    :color="cartStore.isInCart(product.id) ? 'success' : 'surface-variant'"
    :size="size"
    :loading="cartStore.getIsCartLoading"
    variant="tonal"
    prepend-icon="mdi-cart-arrow-down"
    >{{ text }}
  </v-btn>
  <v-btn
    v-else
    @click="cartStore.addProduct(product, quantity, updateQuantity)"
    :color="cartStore.isInCart(product.id) ? 'success' : 'surface-variant'"
    :size="size"
    :loading="cartStore.getIsCartLoading"
    variant="tonal"
    icon="mdi-cart-arrow-down"
  >
  </v-btn>
</template>
