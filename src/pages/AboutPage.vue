<template>
  <v-layout>
    <h1>{{ title }}</h1>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      title: "О нас",
    };
  },
});
</script>

<style lang="scss"></style>
