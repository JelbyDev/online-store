import { Product, CartProduct, OrderProduct } from "@/types";
import { defineStore } from "pinia";
import { Ref, ref, ComputedRef, computed } from "vue";

import prod from "@/assets/moks/products";

export const useCartStore = defineStore("cart", () => {
  const products: Ref<CartProduct[]> = ref([]);

  addProduct(prod[0], 1);
  addProduct(prod[1], 3);

  function addProduct(
    product: Product,
    quantity = 1,
    updateQuantity = false
  ): void {
    quantity = quantity || 1;

    const foundProductInCart = getProduct(product.id);
    if (!foundProductInCart) {
      addNewProduct(product, quantity);
    } else {
      if (!updateQuantity) quantity += foundProductInCart.cartQuantity;
      updateProduct(foundProductInCart, quantity);
    }
  }

  function addNewProduct(product: Product, quantity: number): void {
    products.value.push({
      ...product,
      cartQuantity: quantity,
      cartTotalPrice: product.price * quantity,
    });
  }

  function updateProduct(product: CartProduct, quantity: number) {
    product.cartQuantity = quantity;
    product.cartTotalPrice = product.price * product.cartQuantity;
  }

  function removeProduct(productId: number): void {
    products.value = [
      ...products.value.filter((product) => product.id !== productId),
    ];
  }

  function getProduct(productId: number): CartProduct | undefined {
    return products.value.find((product) => product.id === productId);
  }

  const getProducts: ComputedRef<CartProduct[]> = computed(() => {
    const productsToString = JSON.stringify(products.value);
    return JSON.parse(productsToString);
  });

  const getProductsForOrder: ComputedRef<OrderProduct[]> = computed(() => {
    return products.value.reduce((orderProducts, product) => {
      orderProducts.push({
        id: product.id,
        quantity: product.cartQuantity,
      });
      return orderProducts;
    }, [] as OrderProduct[]);
  });

  const getTotals: ComputedRef<{ quantity: number; price: number }> = computed(
    () => {
      if (products.value.length === 0) return { quantity: 0, price: 0 };
      return products.value.reduce(
        (totals, product) => {
          return {
            quantity: totals.quantity + product.cartQuantity,
            price: totals.price + product.cartTotalPrice,
          };
        },
        { quantity: 0, price: 0 }
      );
    }
  );

  function isInCart(productId: number): boolean {
    if (getProduct(productId)) return true;
    return false;
  }

  return {
    addProduct,
    removeProduct,
    getProducts,
    getProductsForOrder,
    getTotals,
    isInCart,
  };
});
