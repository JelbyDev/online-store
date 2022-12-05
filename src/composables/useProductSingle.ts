import { Product, ProductOption } from "@/types";
import { onMounted, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getProduct } from "@/api/Product";

export function useProductSingle(productId: number) {
  const router = useRouter();

  const product = ref({} as Product);
  const isLoadingProduct: Ref<boolean> = ref(true);
  const optionsList: Ref<ProductOption[]> = ref([]);

  onMounted(() => {
    getProduct(productId)
      .then((response) => {
        if (response === undefined) {
          router.push("/not-found");
        } else {
          product.value = { ...response };
          updateOptionsList();
        }
      })
      .finally(() => {
        isLoadingProduct.value = false;
      });
  });

  function updateOptionsList(): void {
    optionsList.value = [
      { title: "Категория", value: product.value.category },
      { title: "Размер", value: product.value.size },
      { title: "Цвет", value: product.value.color },
      { title: "В наличии", value: product.value.quantity },
    ];
  }

  return {
    product,
    isLoadingProduct,
    optionsList,
  };
}
