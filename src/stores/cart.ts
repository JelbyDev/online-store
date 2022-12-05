import { Product, CartProduct, OrderProduct, CartTotals } from "@/types";
import { defineStore } from "pinia";
import { Ref, ref, ComputedRef, computed, watch, onMounted } from "vue";
import { getProducts as getProductsFromApi } from "@/api/Product";
import { setItemInStorage, getItemFromStorage } from "@/utils/storage";

export const useCartStore = defineStore("cart", () => {
  const products: Ref<CartProduct[]> = ref([]);
  const isCartLoading: Ref<boolean> = ref(false);

  function loadProductsFromStorage(): void | boolean {
    const storageProducts = getItemFromStorage("cartProducts");
    const storageParsedProducts: OrderProduct[] = storageProducts
      ? JSON.parse(storageProducts)
      : [];
    if (!storageParsedProducts.length) return false;

    isCartLoading.value = true;
    const productsId = storageParsedProducts.map((product) => product.id);
    getProductsFromApi(undefined, undefined, undefined, {
      ids: productsId,
    })
      .then((response) => {
        response.products.forEach((product) => {
          const storageProduct = storageParsedProducts.find(
            (stProduct) => stProduct.id === product.id
          );
          if (storageProduct) addProduct(product, storageProduct.quantity);
        });
      })
      .finally(() => (isCartLoading.value = false));
  }

  function createProduct(product: Product, quantity: number): void {
    const cartExceedingQuantity = quantity > product.quantity;
    products.value.push({
      ...product,
      cartQuantity: quantity,
      cartTotalPrice: product.price * quantity,
      cartExceedingQuantity,
    });
  }

  function updateProduct(product: CartProduct, quantity: number) {
    if (quantity > product.quantity) {
      product.cartExceedingQuantity = true;
    } else {
      product.cartExceedingQuantity = false;
    }
    product.cartQuantity = quantity;
    product.cartTotalPrice = product.price * product.cartQuantity;
  }

  function addProduct(
    product: Product,
    quantity = 1,
    updateQuantity = false
  ): void {
    quantity = quantity || 1;

    const foundProductInCart = getProduct(product.id);
    if (!foundProductInCart) {
      createProduct(product, quantity);
    } else {
      if (!updateQuantity) quantity += foundProductInCart.cartQuantity;
      updateProduct(foundProductInCart, quantity);
    }
  }

  function removeProduct(productId: number): void {
    products.value = [
      ...products.value.filter(
        (product: CartProduct) => product.id !== productId
      ),
    ];
  }

  function getProduct(productId: number): CartProduct | undefined {
    return products.value.find(
      (product: CartProduct) => product.id === productId
    );
  }

  const getProducts: ComputedRef<CartProduct[]> = computed(() => {
    return [...products.value];
  });

  const getProductsForOrder: ComputedRef<OrderProduct[]> = computed(() => {
    return products.value.reduce(
      (orderProducts: OrderProduct[], product: CartProduct) => {
        orderProducts.push({
          id: product.id,
          quantity: product.cartQuantity,
        });
        return orderProducts;
      },
      []
    );
  });

  const getTotals: ComputedRef<CartTotals> = computed(() => {
    if (products.value.length === 0) return { quantity: 0, price: 0 };
    return products.value.reduce(
      (totals: CartTotals, product: CartProduct) => {
        return {
          quantity: totals.quantity + product.cartQuantity,
          price: totals.price + product.cartTotalPrice,
        };
      },
      { quantity: 0, price: 0 }
    );
  });

  const getIsCartLoading: ComputedRef<boolean> = computed(() => {
    return isCartLoading.value;
  });

  const isExceedingProductQuantity: ComputedRef<boolean> = computed(() => {
    if (
      products.value.find(
        (product: CartProduct) => product.cartExceedingQuantity
      )
    ) {
      return true;
    }
    return false;
  });

  function isInCart(productId: number): boolean {
    if (getProduct(productId)) return true;
    return false;
  }

  function clearProducts(): void {
    products.value = [];
  }

  watch(
    products,
    () => {
      setItemInStorage(
        "cartProducts",
        JSON.stringify(getProductsForOrder.value)
      );
    },
    { deep: true }
  );

  onMounted(() => {
    loadProductsFromStorage();
  });

  return {
    addProduct,
    removeProduct,
    getProducts,
    getProductsForOrder,
    getTotals,
    getIsCartLoading,
    isInCart,
    isExceedingProductQuantity,
    clearProducts,
  };
});
