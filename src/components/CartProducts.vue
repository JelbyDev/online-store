<template>
  <v-table density="compact">
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
            v-model.lazy.trim.number="product.quantity"
            variant="outlined"
            @change="cartStore.updateProduct(product.id, product.quantity)"
            hide-details
          >
          </v-text-field>
        </td>
        <td class="text-center">
          <app-formatted-price
            :price="product.price * product.quantity"
          ></app-formatted-price>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="text-right" colspan="4">Итого:</td>
        <td class="text-center">
          <app-formatted-price :price="totalPrice"></app-formatted-price>
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>

<script lang="ts">
import { CartProduct } from "@/types";
import { defineComponent, ref, onMounted } from "vue";
import { getProducts } from "@/api/Products";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const products = ref([] as CartProduct[]);
    const totalPrice = ref(0);

    onMounted(() => {
      const cartProductsQuantity = cartStore.getProducts();
      const productsId = Object.keys(cartProductsQuantity).map(
        (productId) => +productId
      );

      getProducts(undefined, undefined, undefined, { ids: productsId }).then(
        (response) => {
          response.products.forEach((product) => {
            const cartProductQuantity = +cartProductsQuantity[product.id];
            const cartProduct = { ...product, quantity: cartProductQuantity };
            products.value.push(cartProduct);
            totalPrice.value += product.price * cartProductQuantity;
          });
        }
      );
    });
    return { cartStore, products, totalPrice };
  },
});
</script>

<style scoped></style>
