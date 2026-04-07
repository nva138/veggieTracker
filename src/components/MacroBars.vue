<script setup>
import { computed } from "vue";

const props = defineProps({
  protein: Number,
  carb: Number,
  fat: Number,
  proteinGoal: Number,
  carbGoal: Number,
  fatGoal: Number,
});

const calcProtein = computed(function () {
  return (props.protein / props.proteinGoal) * 100;
});
const calcCarbs = computed(function () {
  return (props.carb / props.carbGoal) * 100;
});
const calcFat = computed(function () {
  return (props.fat / props.fatGoal) * 100;
});

const proteinRemaining = computed(function () {
  const proteinProgress = props.proteinGoal - props.protein;
  if (proteinProgress === 0) return 0;
  if (proteinProgress < 0) {
    return `+${Math.abs(proteinProgress)}`;
  } else return proteinProgress;
});

const carbRemaining = computed(function () {
  const carbProgress = props.carbGoal - props.carb;
  if (carbProgress === 0) return 0;
  if (carbProgress < 0) {
    return `+${Math.abs(carbProgress)}`;
  } else return carbProgress;
});
const fatRemaining = computed(function () {
  const fatProgress = props.fatGoal - props.fat;
  if (fatProgress === 0) return 0;
  if (fatProgress < 0) {
    return `+${Math.abs(fatProgress)}`;
  } else return fatProgress;
});
</script>

<template>
  <div>
    <div class="bg-gray-200 rounded w-20">
      <div
        class="bg-red-400 h-2 rounded"
        :style="{ width: calcProtein + '%' }"
      ></div>
    </div>
    <span
      class="text - xs"
      :class="{
        'text-green-500': String(proteinRemaining).includes('+'),
      }"
      >Protein {{ proteinRemaining }}</span
    >
  </div>
  <div>
    <div class="bg-gray-200 rounded w-20">
      <div
        class="bg-red-400 h-2 rounded"
        :style="{ width: calcCarbs + '%' }"
      ></div>
    </div>
    <span class="text-xs">Carbs {{ carbRemaining }}</span>
  </div>
  <div>
    <div class="bg-gray-200 rounded w-20">
      <div
        class="bg-red-400 h-2 rounded"
        :style="{ width: calcFat + '%' }"
      ></div>
    </div>
    <span class="text-xs">Fat {{ fatRemaining }}</span>
  </div>
</template>
<style scoped></style>
