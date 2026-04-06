import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import AddMealView from "../views/AddMealView.vue";
import FoodDetailView from "../views/FoodDetailView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/dashboard", component: DashboardView },
  { path: "/add-meal", component: AddMealView },
  { path: "/food-detail/:id", component: FoodDetailView },
];

export default createRouter({ history: createWebHistory(), routes });
