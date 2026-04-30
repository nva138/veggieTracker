<script setup>
import MainNav from "../components/global/MainNav.vue";
import { useFoodStore } from "../stores/useFoodStore";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
const store = useFoodStore();
const expandedDate = ref(null);

function toggleDate(date) {
  expandedDate.value = expandedDate.value === date ? null : date;
}

function removeMeal(id) {
  store.savedMeals = store.savedMeals.filter((meal) => meal.id !== id);
}

const groupedMeals = computed(() => {
  return store.savedMeals.reduce((acc, meal) => {
    if (!acc[meal.date]) acc[meal.date] = [];
    acc[meal.date].push(meal);
    return acc;
  }, {});
});

const dailyTotals = computed(() => {
  return Object.entries(groupedMeals.value).reduce((acc, [date, meals]) => {
    acc[date] = {
      calories: meals.reduce((sum, m) => sum + m.calories, 0),
      proteins: meals.reduce((sum, m) => sum + m.proteins, 0),
    };
    return acc;
  }, {});
});
</script>
<template>
  <div class="w-[92%] mx-auto mt-4 space-y-4 pb-24">
    <div
      v-if="Object.keys(groupedMeals).length === 0"
      class="rounded-2xl shadow-lg bg-white/10 p-8 flex flex-col items-center text-center"
    >
      <div
        class="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4"
      >
        🥗
      </div>
      <h3 class="text-base font-semibold text-gray-800 mb-1">
        No meals yet
      </h3>
      <p class="text-xs text-gray-600 mb-5 max-w-xs">
        Your food diary is empty. Add your first meal and keep track of
        your goals.
      </p>
      <RouterLink
        to="/add-meal"
        class="rounded-xl bg-green-500/20 border border-green-500/30 text-gray-800 text-sm font-semibold px-4 py-2 hover:bg-green-500/30 transition"
      >
        + Add meal
      </RouterLink>
    </div>

    <div
      v-for="(meals, date) in groupedMeals"
      :key="date"
      class="rounded-2xl shadow-lg bg-white/10 p-4"
    >
      <h3
        class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3"
      >
        {{ date }}
      </h3>

      <div
        :class="[
          'rounded-xl p-3 mb-3',
          dailyTotals[date].proteins > store.proteinGoal &&
          dailyTotals[date].calories < store.goal
            ? 'bg-green-500/20 border border-green-500/30'
            : 'bg-gray-500/20 border border-gray-500/30',
        ]"
      >
        <div class="flex justify-between items-center">
          <p class="text-xs text-gray-400">
            {{ dailyTotals[date].proteins }}g Protein
          </p>
          <p class="text-sm font-bold text-gray-800">
            {{ dailyTotals[date].calories }} kcal
          </p>
        </div>
      </div>

      <button
        @click="toggleDate(date)"
        class="text-xs text-gray-400 hover:text-gray-300 mb-2 flex items-center gap-1"
      >
        <span>{{ expandedDate === date ? "🔼" : "🔽" }}</span>
      </button>

      <ul
        v-if="expandedDate === date"
        class="flex flex-col divide-y divide-white/10"
      >
        <li
          v-for="meal in meals"
          :key="meal.id"
          class="py-3 flex justify-between items-center gap-2"
        >
          <div class="w-full">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg">
                <span v-if="meal.mealType === 'breakfast'">🥐</span>
                <span v-else-if="meal.mealType === 'lunch'">🥗</span>
                <span v-else-if="meal.mealType === 'dinner'">🍽️</span>
                <span v-else-if="meal.mealType === 'snack'">🍿</span>
              </span>
              <p class="text-sm font-semibold text-gray-800">
                {{ meal.name }}
              </p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-xs text-gray-400">
                {{ meal.proteins }}g P · {{ meal.carbs }}g C · {{ meal.fats }}g
                F
              </p>
              <p class="text-sm font-bold text-gray-800">
                {{ meal.calories }} kcal
              </p>
            </div>
          </div>
          <button
            @click="removeMeal(meal.id)"
            class="shrink-0 w-7 h-7 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition text-sm"
            aria-label="Delete meal"
          >
            ✕
          </button>
        </li>
      </ul>
    </div>
  </div>
  <MainNav />
</template>
