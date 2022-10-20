<template>
  <v-app>
    <the-header></the-header>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <the-footer></the-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";

export default defineComponent({
  components: { TheFooter, TheHeader },
});
</script>

<style lang="scss">
.v-container {
  max-width: 1200px;
  min-width: 320px;
}
</style>
