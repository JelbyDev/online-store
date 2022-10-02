<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      title: "Главная",
    };
  },
});
</script>

<style lang="scss"></style>
