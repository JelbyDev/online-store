import { Product } from "@/types";
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { getProduct } from "@/api/Product";

export function useProductSingle(productId: number) {
  const router = useRouter();

  const product = ref({} as Product);
  const isLoadingProduct: Ref<boolean> = ref(true);

  onMounted(() => {
    getProduct(productId)
      .then((response) => {
        if (response === undefined) {
          router.push("/not-found");
        } else {
          product.value = { ...response };
        }
      })
      .finally(() => {
        isLoadingProduct.value = false;
      });
  });

  return {
    product,
    isLoadingProduct,
  };
}
