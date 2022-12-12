import { Product, CartProduct, OrderProduct } from "@/types";
import products from "@/moks/products";
import { DELAY_API_RESPONSE } from "@/moks/variables";
import { getItemFromStorage } from "@/utils/storage";

export function getProductsRequest(): Promise<CartProduct[]> {
  return new Promise((resolve) => {
    const storageProducts = getItemFromStorage("cartProducts");
    const storageParsedProducts: OrderProduct[] = storageProducts
      ? JSON.parse(storageProducts)
      : [];

    const returnProducts: CartProduct[] = [];
    if (storageParsedProducts.length) {
      const productsId = storageParsedProducts.map((product) => product.id);
      const filteredProducts = products.filter((product: Product) =>
        productsId.includes(product.id)
      );
      filteredProducts.forEach((product: Product) => {
        const storageProduct = storageParsedProducts.find(
          (stProduct) => stProduct.id === product.id
        );
        if (storageProduct) {
          returnProducts.push({
            ...product,
            cartQuantity: storageProduct.quantity,
            cartTotalPrice: product.price * storageProduct.quantity,
            cartExceedingQuantity: false,
          });
        }
      });
    }
    setTimeout(() => resolve(returnProducts), DELAY_API_RESPONSE);
  });
}
