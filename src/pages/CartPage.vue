<template>
  <div>
    <app-page-title>Корзина товаров</app-page-title>

    <v-scroll-x-transition group>
      <v-alert
        v-if="cartStore.isExceedingProductQuantity"
        type="warning"
        variant="tonal"
        class="mb-3"
        prominent
      >
        К сожалению отмеченных товаров нет в необходимом количестве на наших
        складах. Укажите другое количество или удалите товар, чтобы сделать
        заказ.
      </v-alert>
    </v-scroll-x-transition>

    <cart-products-list>
      <template #orderFormButton>
        <v-btn
          @click="showOrderForm"
          :disabled="cartStore.isExceedingProductQuantity"
          color="info"
          size="large"
        >
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
