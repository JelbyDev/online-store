<script setup lang="ts">
import { OrderProduct } from "@/types/index";
import { defineProps } from "vue";
import { useOrderForm } from "@/composables/useOrderForm";
import OrderFormResponseView from "./OrderFormResponseView.vue";

const props = defineProps<{
  products: OrderProduct[];
}>();

const {
  isFormValid,
  isFormSending,
  customer,
  customerRules,
  sendForm,
  responseSending,
} = useOrderForm(props.products);
</script>

<template>
  <v-sheet class="order-form w-100 px-10 py-7 align-self-center">
    <template v-if="responseSending === null">
      <div class="text-h4 text-center mb-7">Оформление заказа</div>

      <v-form v-model="isFormValid">
        <v-text-field
          v-model="customer.firstName"
          :rules="customerRules.name"
          counter="10"
          class="mb-2"
          label="Ваше имя*"
          variant="outlined"
          autofocus
          required
        ></v-text-field>

        <v-text-field
          v-model="customer.email"
          :rules="customerRules.email"
          class="mb-2"
          label="Ваш E-mail*"
          variant="outlined"
          required
        ></v-text-field>

        <div class="text-center">
          <v-btn
            @click="sendForm"
            :disabled="!isFormValid"
            :loading="isFormSending"
            size="large"
            color="info"
          >
            Оформить
          </v-btn>
        </div>
      </v-form>
    </template>

    <order-form-response-view v-else-if="responseSending === true">
      <template #title>Заказ оформлен</template>
      <template #description>
        Наши менеджеры свяжутся с вами в ближайшее время.
      </template>
    </order-form-response-view>

    <order-form-response-view v-else-if="responseSending === false">
      <template #title>Ошибка</template>
      <template #description>
        При оформлении заказа произошла ошибка. Повторите попытку или обратитесь
        в службу поддержки.
      </template>
    </order-form-response-view>
  </v-sheet>
</template>
