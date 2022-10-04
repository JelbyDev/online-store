import products from "@/assets/moks/products";
import { IProduct } from "@/types";

export function getProducts(
  page = 1,
  sort = "id",
  order = "ASC",
  filters = {}
): Promise<IProduct[]> {
  return new Promise((resolve) => {
    resolve(products);
  });
}
