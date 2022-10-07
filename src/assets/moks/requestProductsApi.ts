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
  search = "",
  filters = {}
): Promise<GetProductsResponse> {
  return new Promise((resolve) => {
    // const filteredProducts = filterProducts();

    const searchedProducts = searchProducts(search, products);
    const filteredProducts = searchedProducts;

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startProdIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endProdIndex = startProdIndex + PRODUCTS_PER_PAGE;

    const limitedProducts = filteredProducts.slice(
      startProdIndex,
      endProdIndex
    );
    const sortedProducts = sortProducts(sort, limitedProducts);

    resolve({
      totalPages: totalPages,
      products: sortedProducts,
    });
  });
}

function searchProducts(searchQuery: string, products: Product[]): Product[] {
  if (!searchQuery) return products;
  return products.filter((product) => product.name.includes(searchQuery));
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
