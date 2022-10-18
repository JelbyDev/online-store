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
    function formattedPrice(price: number): string {
      return price.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
      });
    }
    return { formattedPrice, currency: CURRENCY };
  },
});
</script>

<style scoped></style>
