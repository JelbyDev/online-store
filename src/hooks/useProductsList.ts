import {
  Product,
  SelectedFilters,
  FilteringElements,
  SortingElement,
} from "@/types";
import { Ref, ref, watch, onMounted } from "vue";
import { getProducts } from "@/api/Product";

import FILTERING_ELEMENTS from "@/assets/moks/filters";
import SORTING_ELEMENTS from "@/assets/moks/sorts";

export function useProductsList(filters?: SelectedFilters) {
  const products: Ref<Product[]> = ref([]);
  const isLoadingProducts: Ref<boolean> = ref(false);

  const currentPage: Ref<number> = ref(1);
  const totalPages: Ref<number> = ref(0);

  const sortingElements: SortingElement[] = SORTING_ELEMENTS;
  const filteringElements: FilteringElements = FILTERING_ELEMENTS;

  const defaultSelectedSorting = sortingElements[0]?.value ?? "";
  const selectedSorting: Ref<string> = ref(defaultSelectedSorting);
  const searchQuery: Ref<string> = ref("");
  const selectedFilters: Ref<SelectedFilters> = filters
    ? ref({ ...filters })
    : ref({});

  function loadProducts() {
    isLoadingProducts.value = true;
    products.value = [];
    getProducts(
      currentPage.value,
      selectedSorting.value,
      searchQuery.value,
      selectedFilters.value
    )
      .then((response) => {
        products.value = [...response.products];
        totalPages.value = response.totalPages;
      })
      .finally(() => (isLoadingProducts.value = false));
  }

  watch(currentPage, () => loadProducts());

  watch(
    [searchQuery, selectedSorting, selectedFilters],
    () => {
      const oldCurrentPage = currentPage.value;
      currentPage.value = 1;
      if (oldCurrentPage === 1) {
        loadProducts();
      }
    },
    { deep: true }
  );

  onMounted(() => {
    loadProducts();
  });

  return {
    products,
    isLoadingProducts,
    currentPage,
    totalPages,
    sortingElements,
    filteringElements,
    searchQuery,
    selectedSorting,
    selectedFilters,
  };
}
