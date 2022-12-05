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
            density="compact"
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
import { FilteringElements, SelectedFilters } from "@/types";
import { defineComponent, PropType, Ref, ref, watch } from "vue";
import { useProductsFilter } from "@/composables/useProductsFilter";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<SelectedFilters>,
      required: true,
    },
    filteringElements: {
      type: Object as PropType<FilteringElements>,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (value: SelectedFilters) => value as SelectedFilters,
  },
  setup(props, { emit }) {
    const filterPanelState: Ref<number[]> = ref([0]);
    const { selectedFilters } = useProductsFilter(props.filteringElements);

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
