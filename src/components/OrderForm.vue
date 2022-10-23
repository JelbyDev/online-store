<template>
  <v-sheet class="order-form w-100 px-10 py-7 align-self-center">
    <template v-if="responseSending === null">
      <div class="text-h4 text-center mb-7">Оформление заказа</div>
      <v-form v-model="isFormValid">
        <v-text-field
          v-model="customer.firstName"
          :rules="customerRules.name"
          :counter="10"
          class="mb-2"
          label="Ваше имя*"
          variant="outlined"
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

    <template v-else-if="responseSending === true">
      <div class="text-h4 text-center mb-7">Заказ оформлен</div>
      <div class="text-center text-h6 mb-2">
        Наши менеджеры свяжутся с вами в ближайшее время.
      </div>
    </template>

    <template v-else-if="responseSending === false">
      <div class="text-h4 text-center mb-7">Ошибка</div>
      <div class="text-center text-h6 mb-2">
        При оформлении заказа произошла ошибка. Повторите попытку или обратитесь
        в службу поддержки.
      </div>
    </template>
  </v-sheet>
</template>

<script lang="ts">
import { Customer, Order, OrderProduct } from "@/types/index";
import { defineComponent, Ref, ref, reactive } from "vue";
import { addOrder } from "@/api/Order";

export default defineComponent({
  name: "order-form",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const isFormValid: Ref<boolean> = ref(false);
    const isFormSending: Ref<boolean> = ref(false);
    const responseSending: Ref<boolean | null> = ref(null);

    const customer: Customer = reactive({
      firstName: "",
      email: "",
    });
    const customerRules = {
      name: [
        (v: string): boolean | string => !!v || "Заполните имя",
        (v: string): boolean | string =>
          (v.length >= 3 && v.length <= 10) ||
          "Имя должно быть от 3 до 10 символов",
      ],
      email: [
        (v: string): boolean | string => !!v || "Заполните E-mail",
        (v: string): boolean | string => {
          const emailRegexp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegexp.test(v.toLowerCase()) || "E-mail введен не верно";
        },
      ],
    };

    function sendForm(): void {
      const order: Order = {
        products: [...(props.products as OrderProduct[])],
        customer: customer,
      };

      isFormSending.value = true;
      addOrder(order)
        .then((response) => {
          responseSending.value = response;
        })
        .catch(() => {
          responseSending.value = false;
        })
        .finally(() => {
          isFormSending.value = false;
        });
    }

    return {
      isFormValid,
      isFormSending,
      customer,
      customerRules,
      sendForm,
      responseSending,
    };
  },
});
</script>

<style lang="scss" scoped></style>
