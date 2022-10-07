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

    <v-row class="mt-3">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            :elevation="isHovering ? 5 : 2"
            :class="{ 'on-hover': isHovering }"
            class="rounded-lg"
            v-bind="props"
          >
            <v-img
              :src="product.img"
              height="270"
              position="center center"
              cover
            >
              <v-overlay
                :model-value="isHovering"
                contained
                class="align-center justify-center"
              >
                <v-btn prepend-icon="mdi-magnify" flat>Подробнее</v-btn>
              </v-overlay>
            </v-img>

            <v-card-title>{{ product.price }} руб.</v-card-title>
            <v-card-subtitle>{{ product.name }}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="wishlistStore.toggleProduct(product.id)"
                :color="
                  wishlistStore.checkProduct(product.id)
                    ? 'green'
                    : 'surface-variant'
                "
                size="small"
                variant="tonal"
                icon="mdi-heart"
              ></v-btn>

              <v-btn
                @click="cartStore.addProduct(product.id)"
                :color="
                  cartStore.checkProduct(product.id)
                    ? 'green'
                    : 'surface-variant'
                "
                size="small"
                variant="tonal"
                icon="mdi-cart-arrow-down"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { getProducts } from "@/api/Products";
import { Product } from "@/types";

import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    const products = ref([] as Product[]);

    const currentPage = ref(1);
    const totalPages = ref(0);

    const sortingElements = ref([
      { title: "Названию А-Я", value: "name--ASC" },
      { title: "Названию Я-A", value: "name--DESC" },
      { title: "Цене ▲", value: "price--ASC" },
      { title: "Цене ▼", value: "price--DESC" },
    ]);
    const selectedSorting = ref(sortingElements.value[0].value);
    const searchQuery = ref("");

    watch([currentPage, searchQuery, selectedSorting], loadProducts);

    function loadProducts(): void {
      getProducts(
        currentPage.value,
        selectedSorting.value,
        searchQuery.value
      ).then((prod) => {
        products.value = [...prod.products];
        totalPages.value = prod.totalPages;
      });
    }
    loadProducts();

    return {
      cartStore,
      wishlistStore,

      products,

      searchQuery,
      sortingElements,
      selectedSorting,

      currentPage,
      totalPages,
    };
  },
});
</script>

<style lang="scss">
.v-card {
  cursor: pointer;

  .v-img__img {
    transition: transform 0.5s;
  }

  &.on-hover {
    & .v-img__img {
      transform: scale(1.2);
    }
  }
}
</style>
