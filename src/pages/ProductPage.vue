<template>
  <div style="max-width: 990px">
    <app-loader :is-loading="isLoadingProduct"></app-loader>
    <div v-if="product.id">
      <app-page-title>{{ product.name }}</app-page-title>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-img :src="product.img" align="top center" height="300" cover>
          </v-img>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-row>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item-title>
                  <strong>Категория:</strong> {{ product.category }}
                </v-list-item-title>
                <v-list-item-title
                  ><strong>Размер:</strong> {{ product.size }}
                </v-list-item-title>
                <v-list-item-title
                  ><strong>Цвет:</strong> {{ product.color }}
                </v-list-item-title>
                <v-list-item-title
                  ><strong>В наличии:</strong> {{ product.quantity }}
                </v-list-item-title>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <v-sheet border rounded class="pa-5">
                <v-row dense class="justify-space-between">
                  <v-col cols="auto">
                    <app-formatted-price
                      class="text-h4 font-weight-bold"
                      :price="product.price"
                    ></app-formatted-price>
                  </v-col>
                  <v-col cols="auto">
                    <app-add-product-to-wishlist
                      :productId="product.id"
                    ></app-add-product-to-wishlist>
                  </v-col>
                </v-row>
                <app-add-product-to-cart
                  :product="product"
                  :text="
                    cartStore.isInCart(product.id) ? 'В корзине' : 'В корзину'
                  "
                  size="large"
                ></app-add-product-to-cart>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct } from "@/api/Products";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const route = useRoute();
    const router = useRouter();

    const product = ref({} as Product);
    const isLoadingProduct = ref(true);

    onMounted(() => {
      const productId = +route.params.id;
      getProduct(productId)
        .then((response) => {
          if (response === undefined) {
            router.push("/not-found");
          } else {
            product.value = { ...response };
          }
        })
        .finally(() => {
          isLoadingProduct.value = false;
        });
    });
    return {
      cartStore,
      product,
      isLoadingProduct,
    };
  },
});
</script>

<style lang="scss" scoped></style>
