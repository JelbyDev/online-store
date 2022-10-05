import products from "@/assets/moks/products";
import { Product } from "@/types";

export function getProducts(
  page = 1,
  sort = "id",
  order = "ASC",
  filters = {}
): Promise<Product[]> {
  return new Promise((resolve) => {
    resolve(products);
  });
}
