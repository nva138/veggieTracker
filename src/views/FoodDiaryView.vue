<script setup>
import MainNav from "../components/MainNav.vue";
import { useFoodStore } from "../stores/useFoodStore";
import { computed, ref } from "vue";
const store = useFoodStore();
const expandedDate = ref(null);

function toggleDate(date) {
  expandedDate.value = expandedDate.value === date ? null : date;
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
          class="py-3 flex justify-between items-center"
        >
          <div class="w-full">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg">
                <span v-if="meal.mealTyp === 'breakfast'">🥐</span>
                <span v-else-if="meal.mealTyp === 'lunch'">🥗</span>
                <span v-else-if="meal.mealTyp === 'dinner'">🍽️</span>
                <span v-else-if="meal.mealTyp === 'snack'">🍿</span>
              </span>
              <p class="text-sm font-semibold text-gray-800">
                {{ meal.meal }}
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
        </li>
      </ul>
    </div>
  </div>
  <MainNav />
</template>
