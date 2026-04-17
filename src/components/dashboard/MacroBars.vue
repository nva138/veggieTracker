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

const macros = computed(() => [
  {
    name: "protein",
    remaining: proteinRemaining.value,
    bar: proteinBar(),
    color: "bg-green-400",
  },
  {
    name: "carbs",
    remaining: carbRemaining.value,
    bar: carbBar(),
    color: "bg-yellow-400",
  },
  {
    name: "fat",
    remaining: fatRemaining.value,
    bar: fatBar(),
    color: "bg-red-400",
  },
]);
</script>

<template>
  <div class="flex flex-col gap-3 w-full px-4">
    <div v-for="macro in macros" :key="macro.name">
      <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
        <span>{{ macro.name }}</span>
        <span
          :class="{
            'text-green-500':
              String(macro.remaining).includes('+') && macro.name !== 'fat',
            'text-red-500':
              String(macro.remaining).includes('+') && macro.name === 'fat',
          }"
          >{{ macro.remaining }}g</span
        >
      </div>
      <div class="bg-gray-100 rounded-full h-2 w-full">
        <div
          class="h-2 rounded-full transition-all duration-300"
          :class="macro.color"
          :style="{ width: macro.bar + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>
