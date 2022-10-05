import {
  GetProductsResponse,
  getProductsRequest,
} from "@/assets/moks/requestProductsApi";

export function getProducts(
  page = 1,
  sort = "id",
  order = "ASC",
  filters = {}
): Promise<GetProductsResponse> {
  return getProductsRequest(page, sort, order, filters);
}
