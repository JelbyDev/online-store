<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      title: "Страница не найдена",
    };
  },
});
</script>

<style lang="scss"></style>
