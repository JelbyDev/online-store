<template>
  <div>
    <app-page-title>Корзина товаров</app-page-title>

    <app-loader :is-loading="cartStore.getIsCartLoading"></app-loader>
    <div v-if="cartStore.getProducts.length" class="cart">
      <cart-product-list-item
        v-for="product in cartStore.getProducts"
        :product="product"
        :key="product.id"
      >
      </cart-product-list-item>

      <div class="cart__row d-flex justify-end font-weight-bold text-h6">
        <div class="text-right ma-1 pa-1">Итого:</div>
        <div class="cart__price ma-1 pa-1 text-right">
          <app-formatted-price
            :price="cartStore.getTotals.price"
          ></app-formatted-price>
        </div>
      </div>

      <div class="text-right mt-5">
        <v-btn @click="showOrderForm" color="info" size="large">
          Сделать заказ
        </v-btn>
      </div>
    </div>

    <app-no-products-text v-else-if="!cartStore.getIsCartLoading">
      Нет добавленных товаров...
    </app-no-products-text>
  </div>

  <v-dialog v-model="isOrderFormVisible" max-width="520" min-width="320">
    <order-form :products="cartStore.getProductsForOrder"></order-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import OrderForm from "@/components/OrderForm.vue";
import CartProductListItem from "@/components/CartProductListItem.vue";

export default defineComponent({
  name: "cart-products",
  components: { OrderForm, CartProductListItem },
  setup() {
    const cartStore = useCartStore();
    const isOrderFormVisible: Ref<boolean> = ref(false);

    function showOrderForm() {
      isOrderFormVisible.value = true;
    }

    return { cartStore, isOrderFormVisible, showOrderForm };
  },
});
</script>
