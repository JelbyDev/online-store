<template>
  <v-btn to="/">К списку товаров</v-btn>
  <h1 class="text-h4 mb-5">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-page-title",
});
</script>

<style lang="scss" scoped></style>
