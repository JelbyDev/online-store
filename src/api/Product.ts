import {
  GetProductsResponse,
  GetProductResponse,
  getProductsRequest,
  getProductRequest,
} from "@/assets/moks/requestProductApi";

export function getProducts(
  page = 1,
  sort = "",
  search = "",
  filters = {}
): Promise<GetProductsResponse> {
  return getProductsRequest(page, sort, search, filters);
}

export function getProduct(productId: number): Promise<GetProductResponse> {
  return getProductRequest(productId);
}
