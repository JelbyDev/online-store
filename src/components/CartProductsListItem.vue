<template>
  <v-row
    class="cart-row d-flex align-center justify-center flex-wrap py-2 px-3"
    no-gutters
  >
    <v-col class="pa-1" cols="12" sm="auto">
      <v-btn
        @click="cartStore.removeProduct(product.id)"
        icon="mdi-close"
        size="x-small"
        color="error"
      ></v-btn>
    </v-col>

    <v-col class="pa-1" cols="12" sm="3" md="2">
      <v-img
        :src="product.img"
        :alt="product.name"
        height="130"
        position="center center"
      ></v-img>
    </v-col>

    <v-col
      class="flex-sm-grow-1 text-center text-sm-left pa-1"
      cols="12"
      sm="8"
      md="auto"
    >
      <router-link
        class="cart-row__name text-h6"
        :to="`/product/${product.id}`"
      >
        {{ product.name }}
      </router-link>

      <div class="text-caption">На складе: {{ product.quantity }} шт.</div>

      <v-alert
        v-if="product.cartExceedingQuantity"
        type="warning"
        variant="tonal"
        density="compact"
        class="d-inline-flex"
      >
        Не хватает на складе
      </v-alert>
    </v-col>

    <v-col cols="12" sm="auto" class="text-center pa-1 mt-1 mt-sm-0">
      <div class="cart-row__quantity d-inline-flex align-center">
        <v-btn
          @click="updateQuantityProduct(product, product.cartQuantity - 1)"
          icon="mdi-minus"
          size="x-small"
          color="info"
          class="mr-2"
        ></v-btn>

        <v-text-field
          @change="updateQuantityProduct(product, $event)"
          :model-value="product.cartQuantity"
          bg-color="#fff"
          variant="outlined"
          density="compact"
          hide-details
        >
        </v-text-field>

        <v-btn
          @click="updateQuantityProduct(product, product.cartQuantity + 1)"
          icon="mdi-plus"
          size="x-small"
          color="info"
          class="ml-2"
        ></v-btn>
      </div>
    </v-col>

    <v-col
      class="font-weight-bold text-center text-md-right pa-1 mt-1 mt-sm-0"
      cols="12"
      sm="3"
      md="2"
    >
      <div class="d-md-none">Стоимость:</div>
      <app-formatted-price
        :price="product.cartTotalPrice"
      ></app-formatted-price>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { CartProduct } from "@/types";
import { defineComponent, PropType } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<CartProduct>,
      required: true,
    },
  },
  setup() {
    const cartStore = useCartStore();

    function updateQuantityProduct(
      product: CartProduct,
      quantity: number | Event
    ): void {
      if (typeof quantity === "number") {
        cartStore.addProduct(product, quantity, true);
      } else {
        cartStore.addProduct(
          product,
          +(quantity.target as HTMLInputElement).value,
          true
        );
      }
    }

    return { cartStore, updateQuantityProduct };
  },
});
</script>

<style lang="scss" scoped>
.cart-row {
  border-bottom: 1px solid rgba(var(--v-theme-on-background), 0.3);

  &:first-child {
    border-top: 1px solid rgba(var(--v-theme-on-background), 0.3);
  }

  &__name {
    color: rgb(var(--v-theme-on-background));

    &:hover {
      text-decoration: none;
    }
  }

  &__quantity {
    max-width: 200px;
  }
}
</style>
