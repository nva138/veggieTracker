<script setup>
import { ref } from "vue";
import { useFoodStore } from "../../stores/useFoodStore";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useFoodStore();
const props = defineProps(["food"]);
const emits = defineEmits(["resetRefValue"]);
const amountInput = ref(null);
const mealType = ref("");
const error = ref(false);

const calcCalories = () =>
  Math.floor(
    (props.food.nutriments?.["energy-kcal_100g"] / 100) * amountInput.value,
  ) || 0;

const calcProteins = () =>
  Math.floor(
    (props.food.nutriments?.proteins_100g / 100) * amountInput.value,
  ) || 0;
const calcFats = () =>
  Math.floor((props.food.nutriments?.fat_100g / 100) * amountInput.value) || 0;
const calcCarbs = () =>
  Math.floor(
    (props.food.nutriments?.carbohydrates_100g / 100) * amountInput.value,
  ) || 0;

function pushSelectedFood() {
  store.savedMeals.push({
    id: crypto.randomUUID(),
    meal: props.food.product_name,
    calories: calcCalories(),
    proteins: calcProteins(),
    carbs: calcCarbs(),
    fats: calcFats(),
    mealType: mealType.value,
    date: new Date().toLocaleDateString(),
  });
  router.push("/dashboard");
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
            {{ props.food.product_name }}
          </p>
          <p class="text-xs text-gray-400 mb-4">per 100g</p>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Calories</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutriments["energy-kcal_100g"]) }} kcal
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Protein</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutriments.proteins_100g) }}g
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Carbs</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutriments.carbohydrates_100g) }}g
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Fat</p>
              <p class="text-sm font-semibold text-gray-700">
                {{ Math.round(props.food.nutriments.fat_100g) }}g
              </p>
            </div>
          </div>
        </div>

        <div
          v-else-if="amountInput > 3000"
          class="flex flex-col items-center justify-center h-full text-center"
        >
          <p class="text-4xl mb-2">🤢</p>
          <p class="text-gray-500 text-sm">That's a bit much...</p>
        </div>

        <div v-else>
          <p class="text-lg font-semibold text-gray-800 mb-1">
            {{ props.food.product_name }}
          </p>
          <p class="text-xs text-gray-400 mb-4">per {{ amountInput }}g</p>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-green-50 rounded-xl p-3">
              <p class="text-xs text-gray-400">Calories</p>
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
              <p class="text-xs text-gray-400">Fat</p>
              <p class="text-sm font-semibold text-green-600">
                {{ calcFats() }}g
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1 mb-3">
        <label class="text-sm font-medium text-gray-600">Grams</label>
        <input
          v-model="amountInput"
          placeholder="e.g. 150g"
          type="number"
          class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <p v-if="error" class="text-xs text-red-400 mt-1">Please enter an amount</p>

      <div class="mb-4">
        <label class="text-sm font-medium text-gray-600 block mb-2"
          >Meal type</label
        >
        <div class="grid grid-cols-4 gap-2">
          <button
            @click="mealType = 'breakfast'"
            :class="[
              'rounded-xl px-2 py-2 text-xs font-medium transition-colors',
              mealType === 'breakfast'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            🥐 Breakfast
          </button>
          <button
            @click="mealType = 'lunch'"
            :class="[
              'rounded-xl px-2 py-2 text-xs font-medium transition-colors',
              mealType === 'lunch'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            🥗 Lunch
          </button>
          <button
            @click="mealType = 'dinner'"
            :class="[
              'rounded-xl px-2 py-2 text-xs font-medium transition-colors',
              mealType === 'dinner'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            🍽️ Dinner
          </button>
          <button
            @click="mealType = 'snack'"
            :class="[
              'rounded-xl px-2 py-2 text-xs font-medium transition-colors',
              mealType === 'snack'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            🍿 Snack
          </button>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          @click.stop="
            Number(amountInput) > 0 ? pushSelectedFood() : (error = true)
          "
          :disabled="mealType === ''"
          class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl"
        >
          Log Meal
        </button>
      </div>
    </div>
  </div>
</template>
