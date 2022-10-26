import {
  Product,
  SelectedFilters,
  FilteringElements,
  SortingElement,
} from "@/types";
import { Ref, ref, watch, onMounted } from "vue";
import { getProducts } from "@/api/Product";
import { DELAY_WHEN_WATCH_TEXT_FIELD } from "@/config/variables";

import FILTERING_ELEMENTS from "@/assets/moks/filters";
import SORTING_ELEMENTS from "@/assets/moks/sorts";

export function useProductsList(defaultFilters?: SelectedFilters) {
  const products: Ref<Product[]> = ref([]);
  const isLoadingProducts: Ref<boolean> = ref(false);

  const currentPage: Ref<number> = ref(1);
  const totalPages: Ref<number> = ref(0);

  const sortingElements: SortingElement[] = SORTING_ELEMENTS;
  const filteringElements: FilteringElements = FILTERING_ELEMENTS;

  const defaultSelectedSorting = sortingElements[0]?.value || "";
  const selectedSorting: Ref<string> = ref(defaultSelectedSorting);

  const timeoutWhenWatch = { searchQuery: 0, selectedFilters: 0 };
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

  function initTimeoutWhenWatch(
    watchName: "searchQuery" | "selectedFilters"
  ): void {
    clearTimeout(timeoutWhenWatch[watchName]);
    timeoutWhenWatch[watchName] = setTimeout(
      () => resetCurrentPage(),
      DELAY_WHEN_WATCH_TEXT_FIELD
    );
  }

  watch(currentPage, () => loadProducts());
  watch(selectedSorting, () => resetCurrentPage());
  watch(searchQuery, () => initTimeoutWhenWatch("searchQuery"));
  watch(selectedFilters, () => initTimeoutWhenWatch("selectedFilters"), {
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
