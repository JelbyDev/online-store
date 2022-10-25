<template>
  <tbody v-if="options.length" density="compact">
    <tr v-for="(option, index) in options" :key="index">
      <td>
        <strong>{{ option.title }}:</strong>
      </td>
      <td>{{ option.value }}</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<{ title: string; value: string | number }[]>,
      required: true,
    },
  },
});
</script>
