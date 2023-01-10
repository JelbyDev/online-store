<script setup lang="ts">
import { useProductsList } from "@/composables/useProductsList";
import ProductsList from "@/components/ProductsList.vue";
import ProductsFilter from "@/components/ProductsFilter.vue";

const {
  products,
  isLoadingProducts,
  currentPage,
  totalPages,
  sortingElements,
  filteringElements,
  searchQuery,
  selectedSorting,
  selectedFilters,
} = useProductsList();
</script>

<template>
  <div>
    <app-page-title>Каталог</app-page-title>
    <v-row>
      <v-col cols="12" sm="5" md="4">
        <v-select
          v-model="selectedSorting"
          :items="sortingElements"
          item-title="title"
          item-value="value"
          label="Сортировка по:"
          variant="outlined"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7" md="8">
        <v-text-field
          v-model.trim="searchQuery"
          label="Поиск по названию товара"
          variant="outlined"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" lg="3">
        <products-filter
          v-model="selectedFilters"
          :filtering-elements="filteringElements"
        ></products-filter>
      </v-col>

      <v-col cols="12" md="8" lg="9">
        <products-list
          :products="products"
          :isLoadingProducts="isLoadingProducts"
          :grid-cools="12"
          :grid-sm="6"
          :grid-lg="4"
        ></products-list>

        <div v-if="products.length" class="text-center mt-10">
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
