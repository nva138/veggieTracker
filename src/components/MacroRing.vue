<script setup>
import { computed } from "vue";
const props = defineProps({
  eaten: Number,
  goal: Number,
});

const calcCalories = computed(function () {
  return (props.eaten / props.goal) * 188;
});

console.log(calcCalories);
</script>
<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="grey"
        r="30"
        stroke-width="5"
      ></circle>
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="green"
        r="30"
        stroke-width="5"
        :stroke-dasharray="`${calcCalories} ${188 - calcCalories}`"
        stroke-dashoffset="-47"
      ></circle>
    </svg>
  </div>
</template>
<style scoped></style>
