<template>
  <div>
    <app-page-title>Корзина товаров</app-page-title>

    <cart-products-list>
      <template #orderFormButton>
        <v-btn @click="showOrderForm" color="info" size="large">
          Сделать заказ
        </v-btn>
      </template>
    </cart-products-list>

    <v-dialog v-model="isOrderFormVisible" max-width="520" min-width="320">
      <order-form :products="cartStore.getProductsForOrder"></order-form>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import CartProductsList from "@/components/CartProductsList.vue";
import OrderForm from "@/components/OrderForm.vue";

export default defineComponent({
  components: { OrderForm, CartProductsList },
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
