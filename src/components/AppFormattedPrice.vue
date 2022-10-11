<template>
  <span>{{ formattedPrice(price, currency) }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CURRENCY } from "@/config/variables";

export default defineComponent({
  name: "app-formatted-price",
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  setup() {
    function formattedPrice(price: number, currency: string): string {
      return `${price.toFixed(0)} ${currency}`;
    }
    return { formattedPrice, currency: CURRENCY };
  },
});
</script>

<style scoped></style>
