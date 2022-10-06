import {
  GetProductsResponse,
  getProductsRequest,
  getSortingProductElementsRequest,
} from "@/assets/moks/requestProductsApi";

export function getProducts(
  page = 1,
  sort = "",
  filters = {}
): Promise<GetProductsResponse> {
  return getProductsRequest(page, sort, filters);
}

export function getSortingProductElements() {
  return getSortingProductElementsRequest();
}
