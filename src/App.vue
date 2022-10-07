<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-row no-gutters class="justify-space-between align-center">
          <v-col cols="auto">
            <v-row no-gutters class="align-center">
              <v-app-bar-nav-icon
                @click.stop="isVisibleViewMenu = !isVisibleViewMenu"
              ></v-app-bar-nav-icon>
              <v-app-bar-title>JELBY Market</v-app-bar-title>
              <!--<v-img
                src="@/assets/images/logo.svg"
                :width="100"
                :aspect-ratio="16 / 9"
                alt="Логотип компании"
              ></v-img> -->
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-btn variant="tonal" prepend-icon="mdi-cart-variant">{{
              cartStore.getQuantityProducts()
            }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="isVisibleViewMenu" temporary>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Каталог" to="/">
        </v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="О компании" to="about">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container><router-view /></v-container>
    </v-main>

    <v-footer app absolute>
      <v-container>Footer</v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();

    const isVisibleViewMenu = ref(false);

    return {
      cartStore,
      isVisibleViewMenu,
    };
  },
});
</script>

<style lang="scss">
.v-container {
  max-width: 1280px;
  min-width: 320px;
}
</style>
