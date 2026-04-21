import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { searchFood, searchByBarcode } from "../services/foodService";

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
  const inventory = ref(stored.inventory ?? {});

  const rewardPool = {
    calf: 10,
    lamb: 10,
    chicken: 30,
    piglet: 15,
    nothing: 35,
  };

  const lastRewardDate = ref(stored.lastRewardDate ?? null);

  function setGoal(newGoal) {
    goal.value = newGoal;
  }

  function setMacros(proteinPercent, carbPercent, fatPercent) {
    proteinGoal.value = (goal.value * proteinPercent) / 100 / 4;
    carbGoal.value = (goal.value * carbPercent) / 100 / 4;
    fatGoal.value = (goal.value * fatPercent) / 100 / 9;
  }

  async function fetchFood(query) {
    const result = await searchFood(query);
    searchResults.value = result.products;
    console.log(result.products[0]);
  }

  async function fetchFoodByBarcode(query) {
    const result = await searchByBarcode(query);
    searchResults.value = [result.product];
  }

  function rollReward() {
    const today = new Date().toDateString();
    if (lastRewardDate.value !== today) {
      if (
        eaten.value < goal.value + 50 &&
        eaten.value > goal.value - 50 &&
        goal.value !== 0
      ) {
        const total = Object.values(rewardPool).reduce((s, w) => s + w, 0);
        let r = Math.random() * total;
        for (const [key, weight] of Object.entries(rewardPool)) {
          r -= weight;
          if (r <= 0) {
            if (key !== "nothing") {
              inventory.value[key] = (inventory.value[key] ?? 0) + 1;
            }
            break;
          }
        }
      }
      lastRewardDate.value = today;
    }
  }

  watch(
    [
      goal,
      proteinGoal,
      carbGoal,
      fatGoal,
      savedMeals,
      lastRewardDate,
      inventory,
    ],
    () => {
      localStorage.setItem(
        "veggieTracker",
        JSON.stringify({
          goal: goal.value,
          proteinGoal: proteinGoal.value,
          carbGoal: carbGoal.value,
          fatGoal: fatGoal.value,
          savedMeals: savedMeals.value,
          lastRewardDate: lastRewardDate.value,
          inventory: inventory.value,
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
    lastRewardDate,
    rollReward,
    inventory,
    rewardPool,
    fetchFoodByBarcode,
  };
});
