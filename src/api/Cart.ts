import { CartProduct } from "@/types/index";
import { getProductsRequest } from "@/moks/requestCartApi";

export function getProducts(): Promise<CartProduct[]> {
  return getProductsRequest();
}
