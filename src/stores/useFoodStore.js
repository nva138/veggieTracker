import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { searchFood } from "../services/edamamService";

export const useFoodStore = defineStore("food", () => {
  const stored = JSON.parse(localStorage.getItem("veggieTracker")) || {};

  const eaten = computed(() =>
    savedMeals.value.reduce(function (sum, meal) {
      return sum + meal.calories;
    }, 0),
  );
  const goal = ref(stored.goal ?? 0);
  const protein = computed(() =>
    savedMeals.value.reduce(function (sum, meal) {
      return sum + meal.proteins;
    }, 0),
  );
  const carb = computed(() =>
    savedMeals.value.reduce(function (sum, meal) {
      return sum + meal.carbs;
    }, 0),
  );
  const fat = computed(() =>
    savedMeals.value.reduce(function (sum, meal) {
      return sum + meal.fats;
    }, 0),
  );
  const proteinGoal = ref(stored.proteinGoal ?? 0);
  const carbGoal = ref(stored.carbGoal ?? 0);
  const fatGoal = ref(stored.fatGoal ?? 0);
  const searchResults = ref([]);
  const savedMeals = ref(stored.savedMeals ?? []);

  function setGoal(newGoal) {
    goal.value = newGoal;
  }
  console.log(goal.value);

  function setMacros(proteinPercent, carbPercent, fatPercent) {
    proteinGoal.value = (goal.value * proteinPercent) / 100 / 4;
    carbGoal.value = (goal.value * carbPercent) / 100 / 4;
    fatGoal.value = (goal.value * fatPercent) / 100 / 9;
  }

  async function fetchFood(query) {
    const result = await searchFood(query);
    console.log(result);
    searchResults.value = result.hints;
  }

  watch(
    [goal, proteinGoal, carbGoal, fatGoal, savedMeals],
    () => {
      localStorage.setItem(
        "veggieTracker",
        JSON.stringify({
          goal: goal.value,
          proteinGoal: proteinGoal.value,
          carbGoal: carbGoal.value,
          fatGoal: fatGoal.value,
          savedMeals: savedMeals.value,
        }),
      );
    },
    { deep: true },
  );

  return {
    eaten,
    goal,
    protein,
    carb,
    fat,
    proteinGoal,
    carbGoal,
    fatGoal,
    setGoal,
    searchResults,
    fetchFood,
    savedMeals,
    setMacros,
  };
});
