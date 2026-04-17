<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import MacroRing from "../components/dashboard/MacroRing.vue";
import SearchBar from "../components/dashboard/SearchBar.vue";
import MainNav from "../components/global/MainNav.vue";
import LastLoggedMeals from "../components/dashboard/LastLoggedMeals.vue";
import ReachedGoal from "../components/dashboard/ReachedGoal.vue";

const store = useFoodStore();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex justify-center">
      <MacroRing :eaten="store.eaten" :goal="store.goal" />
    </div>
    <div>
      <LastLoggedMeals />
    </div>
    <div><ReachedGoal /></div>
    <div class="fixed bottom-28 left-0 right-0 px-4">
      <SearchBar />
    </div>
    <div>
      <MainNav />
    </div>
  </div>
</template>

<style scoped></style>
