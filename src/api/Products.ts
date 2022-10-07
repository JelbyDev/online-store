import {
  GetProductsResponse,
  getProductsRequest,
} from "@/assets/moks/requestProductsApi";

export function getProducts(
  page = 1,
  sort = "",
  search = "",
  filters = {}
): Promise<GetProductsResponse> {
  return getProductsRequest(page, sort, search, filters);
}
