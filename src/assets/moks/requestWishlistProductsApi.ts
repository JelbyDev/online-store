import { Product } from "@/types";
import products from "@/assets/moks/products";

export type GetWishlistProductsResponse = Product[];

export function getWishlistProductsRequest(
  productsId: number[] = []
): Promise<Product[]> {
  const returnProducts = products.filter((product) =>
    productsId.includes(product.id)
  );

  return new Promise((resolve) => {
    resolve(returnProducts);
  });
}
