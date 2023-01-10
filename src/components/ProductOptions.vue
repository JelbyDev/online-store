<script setup lang="ts">
import { ProductOption } from "@/types";
import { defineProps } from "vue";

defineProps<{
  options: ProductOption[];
}>();
</script>

<template>
  <v-table v-if="options.length" density="compact">
    <tbody>
      <tr v-for="(option, index) in options" :key="index">
        <td>
          <strong>{{ option.title }}:</strong>
        </td>
        <td>{{ option.value }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
>
