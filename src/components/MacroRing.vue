<script setup>
import MacroBars from "./MacroBars.vue";
import { computed } from "vue";
const props = defineProps({
  eaten: Number,
  goal: Number,
});

const remainingCalories = computed(() => props.goal - props.eaten);

const calcCalories = computed(function () {
  if (props.goal === 0) return 0;
  else return (props.eaten / props.goal) * 188;
});
</script>
<template>
  <div class="w-[92%] mx-auto mt-4 rounded-2xl shadow-lg bg-white/10 p-3">
    <svg viewBox="0 0 100 100" width="10rem" height="10rem">
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
      <text x="50" y="50" text-anchor="middle" dominant-baseline="middle">
        {{ remainingCalories }}
      </text>
      <text
        font-size="5"
        x="50"
        y="55"
        text-anchor="middle"
        dominant-baseline="hanging"
      >
        Remaining
      </text>
    </svg>
    <div class="flex flex-col px-2 pb-2">
      <MacroBars
        :protein="201"
        :protein-goal="200"
        :carb="200"
        :carb-goal="500"
        :fat="4"
        :fat-goal="100"
      />
    </div>
  </div>
</template>
<style scoped></style>
