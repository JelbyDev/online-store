<template>
  <v-table density="compact">
    <template v-if="products.length">
      <caption class="text-h4 mb-7 text-left">
        Корзина товаров
      </caption>
      <thead>
        <tr>
          <th class="text-center">Изображение</th>
          <th>Название</th>
          <th class="text-center">Цена 1 шт.</th>
          <th class="text-center">Кол-во</th>
          <th class="text-center">Общая цена</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <v-img
              :src="product.img"
              height="100"
              position="center center"
            ></v-img>
          </td>
          <td>
            {{ product.name }}
          </td>
          <td class="text-center">
            <app-formatted-price :price="product.price"></app-formatted-price>
          </td>
          <td class="text-center">
            <v-text-field
              v-model.lazy.trim.number="product.cartQuantity"
              variant="outlined"
              @change="
                cartStore.addProduct(product, product.cartQuantity, true)
              "
              hide-details
            >
            </v-text-field>
          </td>
          <td class="text-center">
            <app-formatted-price
              :price="product.cartTotalPrice"
            ></app-formatted-price>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-right" colspan="4">Итого:</td>
          <td class="text-center">
            <app-formatted-price
              :price="cartStore.getTotals.price"
            ></app-formatted-price>
          </td>
        </tr>
      </tfoot>
    </template>
    <template v-else>
      <caption class="text-h4 text-center">
        Корзина товаров пуста
      </caption>
    </template>
  </v-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const products = ref(cartStore.getProducts());

    return { cartStore, products };
  },
});
</script>

<style scoped></style>
