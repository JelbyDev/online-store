<script setup lang="ts">
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

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

<style lang="scss">
.v-container {
  max-width: 1200px;
  min-width: 320px;
}
</style>
