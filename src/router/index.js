import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import AddMealView from "../views/AddMealView.vue";
import FoodDiaryView from "../views/FoodDiaryView.vue";
import SetGoalsView from "../views/SetGoalsView.vue";
import FarmView from "../views/FarmView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/dashboard", component: DashboardView },
  { path: "/add-meal", component: AddMealView },
  { path: "/food-diary", component: FoodDiaryView },
  { path: "/set-goals", component: SetGoalsView },
  { path: "/farm", component: FarmView },
];

export default createRouter({ history: createWebHistory(), routes });
