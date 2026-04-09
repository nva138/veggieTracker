<script setup>
import { ref } from "vue";
const props = defineProps(["food"]);
const emits = defineEmits(["resetRefValue"]);
const amountInput = ref(null);

const calcCalories = () =>
  (props.food.nutrients.ENERC_KCAL / 100) * amountInput.value;

const calcProteins = () =>
  (props.food.nutrients.PROCNT / 100) * amountInput.value;
const calcFats = () => (props.food.nutrients.FAT / 100) * amountInput.value;
const calcCarbs = () => (props.food.nutrients.CHOCDF / 100) * amountInput.value;
</script>
<template>
  <div
    class="fixed inset-0 bg-black/60 flex items-start justify-center z-50 pt-10"
  >
    <div
      @click.stop
      class="relative w-[92%] h-3/4 bg-white rounded-2xl shadow-xl flex flex-col p-5"
    >
      <button
        @click="$emit('resetRefValue')"
        class="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="flex-1 mt-4">
        <div v-if="amountInput < 1">
          <p>{{ props.food.label }} per 100 gramm</p>
          <p>{{ props.food.nutrients.ENERC_KCAL }}</p>
          <p>{{ props.food.nutrients.PROCNT }}</p>
          <p>{{ props.food.nutrients.CHOCDF }}</p>
          <p>{{ props.food.nutrients.FAT }}</p>
        </div>
        <p v-else-if="amountInput > 3000">u cant eat that much 🤢</p>

        <div v-else>
          <p>{{ props.food.label }} per {{ amountInput }} gramm</p>
          <p>{{ calcCalories() }} -CALORIES</p>
          <p>{{ calcProteins() }} - PROTEINS</p>
          <p>{{ calcCarbs() }} - CARBS</p>
          <p>{{ calcFats() }} - FAT</p>
        </div>
      </div>

      <div class="flex flex-col gap-1 mb-4">
        <label class="text-sm font-medium text-gray-600">Gramm</label>
        <input
          v-model="amountInput"
          placeholder="e.g. 150 gramm"
          type="number"
          class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div class="flex justify-end">
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl"
        >
          Log Meal
        </button>
      </div>
    </div>
  </div>
</template>
