import { defineStore } from "pinia";
import { ref } from "vue";

export const useFoodStore = defineStore("food", () => {
  const eaten = ref(0);
  const goal = ref(0);
  const protein = ref(0);
  const carb = ref(0);
  const fat = ref(0);
  const proteinGoal = ref(0);
  const carbGoal = ref(0);
  const fatGoal = ref(0);

  function setGoal(newGoal) {
    goal.value = newGoal;
  }
  function setEaten(newEaten) {
    eaten.value = newEaten;
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
    setEaten,
  };
});
