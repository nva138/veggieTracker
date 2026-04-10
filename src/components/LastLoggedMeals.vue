<script setup>
import { useFoodStore } from "../stores/useFoodStore";
const store = useFoodStore();
</script>
<template>
  <div class="w-[92%] mx-auto mt-3 rounded-2xl shadow-lg bg-white/10 p-3">
    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Heute geloggt</p>
    <ul class="flex flex-col divide-y divide-white/10">
      <li
        v-for="foodItem in store.savedMeals"
        class="px-1 py-3 flex justify-between items-center"
      >
        <div class="w-full">
          <p class="text-sm font-semibold text-gray-800 mb-1">{{ foodItem.meal }}</p>
          <div class="flex justify-between items-center">
            <p class="text-xs text-gray-400">
              {{ foodItem.proteins }}g P · {{ foodItem.carbs }}g C · {{ foodItem.fats }}g F
            </p>
            <p class="text-sm font-bold text-green-400">{{ foodItem.calories }} kcal</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
