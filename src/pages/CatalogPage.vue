<template>
  <div>
    <app-page-title>Каталог</app-page-title>
    <v-row>
      <v-col cols="6" md="4">
        <v-select
          v-model="selectedSorting"
          :items="sortingElements"
          item-title="title"
          item-value="value"
          label="Сортировка по:"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col cols="6" md="8">
        <v-text-field
          v-model.trim="searchQuery"
          label="Поиск по названию товара"
          variant="outlined"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <product-filter
          v-model="selectedFilters"
          :filtering-elements="filteringElements"
        ></product-filter>
      </v-col>
      <v-col cols="9">
        <product-list
          :products="products"
          :grid-cools="12"
          :grid-sm="6"
          :grid-md="4"
        ></product-list>

        <div class="text-center mt-10">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, Ref, ref, watch, onMounted } from "vue";
import { getProducts } from "@/api/Products";
import { FILTERING_ELEMENTS, SORTING_ELEMENTS } from "@/assets/moks/filters";

import ProductList from "@/components/ProductList.vue";
import ProductFilter from "../components/ProductFilter.vue";

export default defineComponent({
  components: { ProductList, ProductFilter },
  setup() {
    const products: Ref<Product[]> = ref([]);
    const currentPage: Ref<number> = ref(1);
    const totalPages: Ref<number> = ref(0);

    const sortingElements = SORTING_ELEMENTS;
    const selectedSorting: Ref<string> = ref(sortingElements[0].value);
    const searchQuery: Ref<string> = ref("");

    const filteringElements = FILTERING_ELEMENTS;
    const selectedFilters: Ref<{ [index: string]: number }> = ref({});

    watch(
      [currentPage, searchQuery, selectedSorting, selectedFilters],
      loadProducts,
      { deep: true }
    );

    function loadProducts(): void {
      getProducts(
        currentPage.value,
        selectedSorting.value,
        searchQuery.value,
        selectedFilters.value
      ).then((response) => {
        products.value = [...response.products];
        totalPages.value = response.totalPages;
      });
    }

    onMounted(() => {
      loadProducts();
    });

    return {
      products,

      searchQuery,
      sortingElements,
      selectedSorting,

      selectedFilters,
      filteringElements,

      currentPage,
      totalPages,
    };
  },
});
</script>

<style lang="scss"></style>
