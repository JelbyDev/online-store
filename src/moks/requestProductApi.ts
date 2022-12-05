import { Product } from "@/types";
import products from "@/moks/products";
import { PRODUCTS_PER_PAGE, DELAY_API_RESPONSE } from "@/moks/variables";

interface filterElements {
  ids?: number[];
  color?: string[];
  popular?: string[];
  category?: string[];
  size?: string[];
  price?: number[];
}

export interface GetProductsResponse {
  totalPages: number;
  products: Product[];
}

export type GetProductResponse = Product | undefined;

export function getProductRequest(
  productId: number
): Promise<GetProductResponse> {
  return new Promise((resolve) => {
    const product = products.find((product) => product.id === productId);
    setTimeout(() => resolve(product), DELAY_API_RESPONSE);
  });
}

export function getProductsRequest(
  page: number,
  sort: string,
  search = "",
  filters: filterElements = {}
): Promise<GetProductsResponse> {
  return new Promise((resolve) => {
    const sortedProducts = sortProducts(sort, products);

    const searchedProducts = searchProducts(search, sortedProducts);
    const filteredProducts = filterProducts(filters, searchedProducts);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    const limitedProducts = limitProducts(
      filteredProducts,
      page,
      !!filters.ids
    );

    setTimeout(
      () =>
        resolve({
          totalPages: totalPages,
          products: limitedProducts,
        }),
      DELAY_API_RESPONSE
    );
  });
}

function limitProducts(
  products: Product[],
  page: number,
  isNotLimit = false
): Product[] {
  if (isNotLimit) return [...products];
  const startProdIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endProdIndex = startProdIndex + PRODUCTS_PER_PAGE;
  return [...products.slice(startProdIndex, endProdIndex)];
}

function searchProducts(searchQuery: string, products: Product[]): Product[] {
  if (!searchQuery) return [...products];
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

function filterProducts(
  filters: filterElements,
  products: Product[]
): Product[] {
  let returnProducts = [...products];

  if (filters.ids) {
    returnProducts = returnProducts.filter((product) =>
      filters.ids?.includes(product.id)
    );
  }

  if (filters.popular) {
    returnProducts = returnProducts.filter((product) => product.isPopular);
  }

  if (filters.color && filters.color.length > 0) {
    returnProducts = returnProducts.filter((product) =>
      filters.color?.includes(product.color)
    );
  }

  if (filters.category && filters.category.length > 0) {
    returnProducts = returnProducts.filter((product) =>
      filters.category?.includes(product.category)
    );
  }

  if (filters.size && filters.size.length > 0) {
    returnProducts = returnProducts.filter((product) =>
      filters.size?.includes(product.size)
    );
  }

  if (filters.price && filters.price.length === 2) {
    returnProducts = returnProducts.filter(
      (product) =>
        filters.price &&
        product.price >= filters.price[0] &&
        product.price <= filters.price[1]
    );
  }

  return returnProducts;
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
