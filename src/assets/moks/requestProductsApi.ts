import products from "@/assets/moks/products";
import { Product } from "@/types";

const PRODUCTS_PER_PAGE = 8;

export interface GetProductsResponse {
  totalPages: number;
  products: Product[];
}

export function getProductsRequest(
  page: number,
  sort: string,
  order: string,
  filters = {}
): Promise<GetProductsResponse> {
  return new Promise((resolve) => {
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startProdIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endProdIndex = startProdIndex + PRODUCTS_PER_PAGE;

    const returnProducts = products.slice(startProdIndex, endProdIndex);

    resolve({
      totalPages: totalPages,
      products: returnProducts,
    });
  });
}
