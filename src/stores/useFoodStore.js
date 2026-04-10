import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { searchFood } from "../services/edamamService";

export const useFoodStore = defineStore("food", () => {
  const eaten = computed(() =>
    savedMeals.value.reduce(function (sum, meal) {
      return sum + meal.calories;
    }, 0),
  );
  const goal = ref(0);
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
  const proteinGoal = ref(0);
  const carbGoal = ref(0);
  const fatGoal = ref(0);
  const searchResults = ref([]);
  const savedMeals = ref([]);

  function setGoal(newGoal) {
    goal.value = newGoal;
  }

  async function fetchFood(query) {
    const result = await searchFood(query);
    console.log(result);
    searchResults.value = result.hints;
  }

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
  };
});
