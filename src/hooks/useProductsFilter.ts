import { SelectedFilters, FilteringElements } from "@/types";
import { reactive } from "vue";

export function useProductsFilter(filteringElements: FilteringElements) {
  const selectedFilters: SelectedFilters = reactive(
    getDefaultSelectedFilters(filteringElements)
  );

  function getDefaultSelectedFilters(
    filteringElements: FilteringElements
  ): SelectedFilters {
    const entriesFilteringElements = Object.entries(filteringElements);
    return entriesFilteringElements.reduce((selectedFilters, filter) => {
      const filterName = filter[0];
      const filterType = filter[1].type;
      const filterValues = filterType === "switch" ? "" : filter[1].values;

      switch (filterType) {
        case "checkbox":
          selectedFilters[filterName] = [];
          break;
        case "range":
          selectedFilters[filterName] = [...filterValues];
          break;
        case "switch":
          selectedFilters[filterName] = false;
          break;
        default:
          break;
      }
      return selectedFilters;
    }, {} as SelectedFilters);
  }

  return {
    selectedFilters,
  };
}
