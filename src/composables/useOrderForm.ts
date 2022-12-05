import { Customer, Order, OrderProduct } from "@/types/index";
import { Ref, ref, reactive } from "vue";
import { addOrder } from "@/api/Order";
import { useCartStore } from "@/stores/cart";

export function useOrderForm(products: OrderProduct[]) {
  const cartStore = useCartStore();
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
      products: [...products],
      customer: customer,
    };

    isFormSending.value = true;
    addOrder(order)
      .then((response) => {
        responseSending.value = response;
        cartStore.clearProducts();
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
}
