import {
  Product,
  SelectedFilters,
  FilteringElements,
  SortingElement,
} from "@/types";
import { Ref, ref, watch, onMounted } from "vue";
import { getProducts } from "@/api/Product";
import { DEBOUNCE_DELAY } from "@/config/variables";

import FILTERING_ELEMENTS from "@/moks/filters";
import SORTING_ELEMENTS from "@/moks/sorts";

export function useProductsList(defaultFilters?: SelectedFilters) {
  const products: Ref<Product[]> = ref([]);
  const isLoadingProducts: Ref<boolean> = ref(false);

  const currentPage: Ref<number> = ref(1);
  const totalPages: Ref<number> = ref(0);

  const sortingElements: SortingElement[] = SORTING_ELEMENTS;
  const filteringElements: FilteringElements = FILTERING_ELEMENTS;

  const defaultSelectedSorting = sortingElements[0]?.value || "";
  const selectedSorting: Ref<string> = ref(defaultSelectedSorting);

  const debounceTimers = { searchQuery: 0, selectedFilters: 0 };
  const searchQuery: Ref<string> = ref("");
  const selectedFilters: Ref<SelectedFilters> = defaultFilters
    ? ref({ ...defaultFilters })
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

  function resetCurrentPage(): void {
    const oldCurrentPage = currentPage.value;
    currentPage.value = 1;
    if (oldCurrentPage === 1) {
      loadProducts();
    }
  }

  function setDebounce(watchName: "searchQuery" | "selectedFilters"): void {
    clearTimeout(debounceTimers[watchName]);
    debounceTimers[watchName] = setTimeout(
      () => resetCurrentPage(),
      DEBOUNCE_DELAY
    );
  }

  watch(currentPage, () => loadProducts());
  watch(selectedSorting, () => resetCurrentPage());
  watch(searchQuery, () => setDebounce("searchQuery"));
  watch(selectedFilters, () => setDebounce("selectedFilters"), {
    deep: true,
  });

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
