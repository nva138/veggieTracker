<script setup>
import { ref } from "vue";
import { useFoodStore } from "../stores/useFoodStore";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useFoodStore();
const props = defineProps(["food"]);
const emits = defineEmits(["resetRefValue"]);
const amountInput = ref(null);

const calcCalories = () =>
  Math.floor((props.food.nutrients.ENERC_KCAL / 100) * amountInput.value);

const calcProteins = () =>
  Math.floor((props.food.nutrients.PROCNT / 100) * amountInput.value);
const calcFats = () =>
  Math.floor((props.food.nutrients.FAT / 100) * amountInput.value);
const calcCarbs = () =>
  Math.floor((props.food.nutrients.CHOCDF / 100) * amountInput.value);

function pushSelectedFood() {
  store.savedMeals.push({
    meal: props.food.label,
    calories: calcCalories(),
    proteins: calcProteins(),
    carbs: calcCarbs(),
    fats: calcFats(),
  });
  router.push("/dashboard");

  console.log(store.savedMeals);
}
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
          <p class="text-lg font-semibold text-gray-800 mb-1">
            {{ props.food.label }}
          </p>
          <p class="text-xs text-gray-400 mb-4">per 100g</p>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Kalorien</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutrients.ENERC_KCAL) }} kcal
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Protein</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutrients.PROCNT) }}g
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Carbs</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutrients.CHOCDF) }}g
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Fett</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutrients.FAT) }}g
              </p>
            </div>
          </div>
        </div>

        <div
          v-else-if="amountInput > 3000"
          class="flex flex-col items-center justify-center h-full text-center"
        >
          <p class="text-4xl mb-2">🤢</p>
          <p class="text-gray-500 text-sm">Das ist ein bisschen viel...</p>
        </div>

        <div v-else>
          <p class="text-lg font-semibold text-gray-800 mb-1">
            {{ props.food.label }}
          </p>
          <p class="text-xs text-gray-400 mb-4">per {{ amountInput }}g</p>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-green-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Kalorien</p>
              <p class="text-sm font-semibold text-green-600">
                {{ calcCalories() }} kcal
              </p>
            </div>
            <div class="bg-green-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Protein</p>
              <p class="text-sm font-semibold text-green-600">
                {{ calcProteins() }}g
              </p>
            </div>
            <div class="bg-green-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Carbs</p>
              <p class="text-sm font-semibold text-green-600">
                {{ calcCarbs() }}g
              </p>
            </div>
            <div class="bg-green-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Fett</p>
              <p class="text-sm font-semibold text-green-600">
                {{ calcFats() }}g
              </p>
            </div>
          </div>
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
          @click="pushSelectedFood()"
          class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl"
        >
          Log Meal
        </button>
      </div>
    </div>
  </div>
</template>
