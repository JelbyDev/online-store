import { Product } from "@/types";
import {
  GetWishlistProductsResponse,
  getWishlistProductsRequest,
} from "@/assets/moks/requestWishlistProductsApi";

export function getWishlistProducts(
  productsId: number[] = []
): Promise<Product[]> {
  return getWishlistProductsRequest(productsId);
}
