<template>
  <div
    v-if="isLoading"
    class="progress-circular-container d-flex justify-center align-center"
  >
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-loader",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.progress-circular-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>
