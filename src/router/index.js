import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import AddMealView from "../views/AddMealView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/dashboard", component: DashboardView },
  { path: "/add-meal", component: AddMealView },
];

export default createRouter({ history: createWebHistory(), routes });
