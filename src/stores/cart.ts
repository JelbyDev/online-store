import { Product, CartProduct } from "@/types";
import { defineStore } from "pinia";
import { ref, computed, ComputedRef } from "vue";

export const useCartStore = defineStore("cart", () => {
  const products = ref([] as CartProduct[]);

  function addProduct(
    product: Product,
    quantity = 1,
    updateQuantity = false
  ): void {
    const foundProductInCart = getProduct(product.id);
    if (!foundProductInCart) {
      const newProduct = {
        ...product,
        cartQuantity: quantity,
        cartTotalPrice: product.price * quantity,
      };
      products.value.push(newProduct);
    } else {
      if (updateQuantity) {
        foundProductInCart.cartQuantity = quantity;
      } else {
        foundProductInCart.cartQuantity += quantity;
      }
      foundProductInCart.cartTotalPrice =
        foundProductInCart.price * foundProductInCart.cartQuantity;
    }
  }

  function removeProduct(productId: number): void {
    products.value = [
      ...products.value.filter((product) => product.id !== productId),
    ];
  }

  function getProduct(productId: number): CartProduct | undefined {
    return products.value.find((product) => product.id === productId);
  }

  function getProducts(): CartProduct[] {
    return [...products.value];
  }

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
    getTotals,
    isInCart,
  };
});
