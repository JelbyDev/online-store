import products from "@/assets/moks/products";
import { Product, SortingElement } from "@/types";

const PRODUCTS_PER_PAGE = 8;

export interface GetProductsResponse {
  totalPages: number;
  products: Product[];
}

export function getSortingProductElementsRequest(): Promise<SortingElement[]> {
  return new Promise((resolve) => {
    resolve([
      { title: "Названию А-Я", value: "name--ASC" },
      { title: "Названию Я-A", value: "name--DESC" },
      { title: "Цене ▲", value: "price--ASC" },
      { title: "Цене ▼", value: "price--DESC" },
    ]);
  });
}

export function getProductsRequest(
  page: number,
  sort: string,
  filters = {}
): Promise<GetProductsResponse> {
  return new Promise((resolve) => {
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startProdIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endProdIndex = startProdIndex + PRODUCTS_PER_PAGE;

    const limitedProducts = products.slice(startProdIndex, endProdIndex);
    const sortedProducts = sortProducts(sort, limitedProducts);

    resolve({
      totalPages: totalPages,
      products: sortedProducts,
    });
  });
}

function sortProducts(sort: string, products: Product[]): Product[] {
  const sortingFunctions = {
    "name--ASC": (a: Product, b: Product) => a.name.localeCompare(b.name),
    "name--DESC": (a: Product, b: Product) => b.name.localeCompare(a.name),
    "price--ASC": (a: Product, b: Product) => a.price - b.price,
    "price--DESC": (a: Product, b: Product) => b.price - a.price,
  };

  if (sort in sortingFunctions) {
    return [...products].sort(
      sortingFunctions[sort as keyof typeof sortingFunctions]
    );
  }
  return [...products];
}
