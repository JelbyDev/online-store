<template>
  <v-btn
    v-if="route.path !== '/'"
    to="/"
    variant="outlined"
    color="info"
    prepend-icon="mdi-arrow-left"
    size="small"
  >
    В каталог
  </v-btn>

  <h1 class="text-h4 mb-5">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "app-page-title",
  setup() {
    const route = useRoute();
    return { route };
  },
});
</script>
