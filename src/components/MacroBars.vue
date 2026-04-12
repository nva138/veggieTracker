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

const calcProtein = computed(() => (props.protein / props.proteinGoal) * 100);
const calcCarbs = computed(() => (props.carb / props.carbGoal) * 100);
const calcFat = computed(() => (props.fat / props.fatGoal) * 100);

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

const proteinBar = () => (calcProtein.value > 100 ? 100 : calcProtein.value);
const carbBar = () => (calcCarbs.value > 100 ? 100 : calcCarbs.value);
const fatBar = () => (calcFat.value > 100 ? 100 : calcFat.value);

console.log(props.proteinGoal, props.carbGoal, props.fatGoal);
</script>

<template>
  <div class="flex flex-col gap-3 w-full px-4">
    <div>
      <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
        <span>Protein</span>
        <span
          :class="{ 'text-green-500': String(proteinRemaining).includes('+') }"
          >{{ proteinRemaining }}g</span
        >
      </div>
      <div class="bg-gray-100 rounded-full h-2 w-full">
        <div
          class="bg-red-400 h-2 rounded-full transition-all duration-300"
          :style="{ width: proteinBar() + '%' }"
        ></div>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
        <span>Carbs</span>
        <span :class="{ 'text-red-500': String(carbRemaining).includes('+') }"
          >{{ carbRemaining }}g</span
        >
      </div>
      <div class="bg-gray-100 rounded-full h-2 w-full">
        <div
          class="bg-amber-400 h-2 rounded-full transition-all duration-300"
          :style="{ width: carbBar() + '%' }"
        ></div>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
        <span>Fat</span>
        <span :class="{ 'text-red-500': String(fatRemaining).includes('+') }"
          >{{ fatRemaining }}g</span
        >
      </div>
      <div class="bg-gray-100 rounded-full h-2 w-full">
        <div
          class="bg-violet-400 h-2 rounded-full transition-all duration-300"
          :style="{ width: fatBar() + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>
