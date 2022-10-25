<template>
  <v-app-bar color="headerBg">
    <v-container>
      <v-row no-gutters class="justify-space-between align-center">
        <v-col cols="auto">
          <v-app-bar-title>JELBY Market</v-app-bar-title>
        </v-col>

        <v-col cols="auto">
          <v-row dense>
            <v-col>
              <v-btn
                to="/wishlist"
                :color="wishlistStore.getTotalCountProducts ? 'info' : ''"
                variant="tonal"
                prepend-icon="mdi-heart"
              >
                {{ wishlistStore.getTotalCountProducts }}
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                to="/cart"
                :color="cartStore.getTotals.quantity ? 'info' : ''"
                :loading="cartStore.getIsCartLoading"
                variant="tonal"
                prepend-icon="mdi-cart-variant"
              >
                {{ cartStore.getTotals.quantity }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    return {
      cartStore,
      wishlistStore,
    };
  },
});
</script>
