<template>
  <v-expansion-panels v-model="filterPanelState" variant="accordion" multiple>
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
        <div v-if="filteringElement.type === 'range'" class="pt-7">
          <v-range-slider
            v-model="selectedFilters[index]"
            :min="filteringElement.values[0]"
            :max="filteringElement.values[1]"
            step="10"
            thumb-label="always"
            color="info"
          ></v-range-slider>
        </div>
        <div v-else-if="filteringElement.type === 'checkbox'">
          <v-checkbox
            v-for="(filterValue, indexVal) in filteringElement.values"
            :key="indexVal"
            v-model="selectedFilters[index]"
            :label="filterValue"
            :value="filterValue"
            color="info"
            hide-details
            multiple
          ></v-checkbox>
        </div>
        <div v-else-if="filteringElement.type === 'switch'">
          <v-switch
            v-model="selectedFilters[index]"
            label="Да"
            color="info"
            hide-details
          ></v-switch>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "product-filter",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    filteringElements: {
      type: Object,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (value: { [index: number]: number[] | string[] }) =>
      value as { [index: number]: number[] | string[] },
  },
  setup(props, { emit }) {
    const filterPanelState = ref([0]);

    const selectedFilters = reactive(
      Object.entries(props.filteringElements).reduce((returnObj, filter) => {
        const filterName = filter[0];
        const filterType = filter[1].type;
        const filterValues = filter[1].values;
        if (filterType === "checkbox") returnObj[filterName] = [];
        if (filterType === "range") returnObj[filterName] = [...filterValues];
        return returnObj;
      }, {} as { [index: string]: string[] })
    );

    watch(selectedFilters, () => {
      emit("update:modelValue", selectedFilters);
    });

    return {
      filterPanelState,
      selectedFilters,
    };
  },
});
</script>

<style lang="scss"></style>
