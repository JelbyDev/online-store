<template>
  <v-footer app absolute color="footerBg">
    <v-container class="pa-1">
      <div class="text-center mb-1">
        <v-btn
          target="_blank"
          prepend-icon="mdi-github"
          variant="text"
          href="https://github.com/JelbyDev"
        >
          JelbyDev
        </v-btn>
      </div>
      <v-row dense class="justify-center">
        <v-col
          v-for="(technology, index) in technologyList"
          :key="index"
          cols="auto"
        >
          {{ technology }}
        </v-col>
      </v-row>
      <div class="text-center mt-3">© 2022</div>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "the-footer",
  setup() {
    const technologyList = [
      "Vue 3",
      "Vuetify",
      "VueRouter",
      "TypeScript",
      "Pinia",
    ];

    return { technologyList };
  },
});
</script>

<style lang="scss"></style>
