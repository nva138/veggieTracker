import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import AddMealView from "../views/AddMealView.vue";
import FoodDiaryView from "../views/FoodDiaryView.vue";
import SetGoalsView from "../views/SetGoalsView.vue";
import FarmView from "../views/FarmView.vue";

const routes = [
  { path: "/", name: "Login", component: HomeView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
  { path: "/add-meal", name: "AddMeal", component: AddMealView },
  { path: "/food-diary", name: "FoodDiary", component: FoodDiaryView },
  { path: "/set-goals", name: "SetGoals", component: SetGoalsView },
  { path: "/farm", name: "Farm", component: FarmView },
];

export default createRouter({ history: createWebHistory(), routes });
