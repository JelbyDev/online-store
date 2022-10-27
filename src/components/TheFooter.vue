<template>
  <v-footer app absolute color="footerBg">
    <v-container class="pa-1">
      <div class="text-center mb-1">
        <v-btn
          target="_blank"
          prepend-icon="mdi-github"
          variant="text"
          href="https://github.com/JelbyDev/online-store"
        >
          Online-store
        </v-btn>
      </div>

      <div class="d-flex justify-center flex-wrap">
        <div
          class="pa-1"
          v-for="(technology, index) in technologyList"
          :key="index"
        >
          {{ technology }}
        </div>
      </div>

      <div class="text-center mt-3">© 2022</div>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const technologyList = [
      "Vue 3",
      "Vuetify",
      "VueRouter",
      "Pinia",
      "TypeScript",
    ];

    return { technologyList };
  },
});
</script>
