<script setup>
import { useFoodStore } from "../../stores/useFoodStore";
const store = useFoodStore();
const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
function removeMeal(id) {
  store.savedMeals = store.savedMeals.filter((meal) => meal.id !== id);
}
</script>
<template>
  <div class="w-[92%] mx-auto mt-3 rounded-2xl shadow-lg bg-white/10 p-3">
    <p
      class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1"
    >
      Today's meals
    </p>

    <div v-for="type in mealTypes" :key="type">
      <label class="capitalize text-sm font-medium text-gray-400">{{
        type
      }}</label>
      <ul class="flex flex-col divide-y divide-white/10">
        <template
          v-for="(foodItem, index) in store.savedMeals"
          :key="foodItem.id"
        >
          <li
            v-if="
              foodItem.date === new Date().toLocaleDateString() &&
              foodItem.mealType === type
            "
            class="px-1 py-3 flex justify-between items-center"
          >
            <div class="w-full">
              <p class="text-sm font-semibold text-gray-800 mb-1">
                {{ foodItem.meal }}
              </p>
              <div class="flex justify-between items-center">
                <p class="text-xs text-gray-400">
                  {{ foodItem.proteins }}g P · {{ foodItem.carbs }}g C ·
                  {{ foodItem.fats }}g F
                </p>
                <p class="text-sm font-bold text-green-400">
                  {{ foodItem.calories }} kcal
                </p>
              </div>
              <button @click="removeMeal(foodItem.id)">X</button>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
