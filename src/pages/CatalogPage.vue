<template>
  <div>
    <h1 class="text-h3">Каталог</h1>

    <v-row class="mt-3">
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
        <v-expansion-panels v-model="filterPanelState" multiple>
          <v-expansion-panel
            v-for="(filteringElement, index) in filteringElements"
            :key="index"
          >
            <v-expansion-panel-title
              expand-icon="mdi-menu-down"
              collapse-icon="mdi-menu-up"
            >
              {{ filteringElement.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                v-for="(filterValue, indexVal) in filteringElement.values"
                :key="indexVal"
              >
                <v-checkbox
                  v-model="selectedFilters[index]"
                  :label="filterValue"
                  :value="filterValue"
                  hide-details
                  multiple
                ></v-checkbox>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
import { defineComponent, reactive, ref, watch, onMounted } from "vue";
import { getProducts } from "@/api/Products";

import ProductList from "@/components/ProductList.vue";

export default defineComponent({
  components: { ProductList },
  setup() {
    const products = ref([] as Product[]);

    const currentPage = ref(1);
    const totalPages = ref(0);

    const sortingElements = [
      { title: "Названию А-Я", value: "name--ASC" },
      { title: "Названию Я-A", value: "name--DESC" },
      { title: "Цене ▲", value: "price--ASC" },
      { title: "Цене ▼", value: "price--DESC" },
    ];
    const selectedSorting = ref(sortingElements[0].value);
    const searchQuery = ref("");

    const filterPanelState = ref([0]);
    const filteringElements = {
      category: {
        title: "Категория",
        // type: "checkbox",
        values: ["Джем", "Горный", "Клиар", "Ориджинал"],
      },
      size: {
        title: "Размер",
        // type: "checkbox",
        values: ["100", "200", "300", "400"],
      },
      color: {
        title: "Цвет",
        // type: "checkbox",
        values: ["Красный", "Зеленый", "Синий", "Желтый"],
      },
      popular: {
        title: "Популярные товары",
        // type: "switch",
        values: ["Да"],
      },
    };

    const selectedFilters = reactive(
      Object.keys(filteringElements).reduce((returnObj, filterName) => {
        returnObj[filterName] = [];
        return returnObj;
      }, {} as { [index: string]: string[] })
    );

    /* const selectedFilters = reactive(
      Object.entries(filteringElements).reduce((returnObj, filter) => {
        const filterName = filter[0];
        const filterType = filter[1].type;
        if (filterType === "checkbox") returnObj[filterName] = [];
        if (filterType === "switch") returnObj[filterName] = false;
        return returnObj;
      }, {} as { [index: string]: string[] | boolean })
    ); */

    watch(
      [currentPage, searchQuery, selectedSorting, selectedFilters],
      loadProducts
    );

    function loadProducts(): void {
      getProducts(
        currentPage.value,
        selectedSorting.value,
        searchQuery.value,
        selectedFilters
      ).then((prod) => {
        products.value = [...prod.products];
        totalPages.value = prod.totalPages;
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

      filterPanelState,
      filteringElements,
      selectedFilters,

      currentPage,
      totalPages,
    };
  },
});
</script>

<style lang="scss"></style>
