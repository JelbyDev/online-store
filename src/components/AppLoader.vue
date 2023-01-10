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

<template>
  <div
    v-if="isLoading"
    class="progress-circular-container d-flex justify-center align-center"
  >
    <v-progress-circular
      :size="50"
      color="info"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style lang="scss" scoped>
.progress-circular-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>
