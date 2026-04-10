<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import MacroRing from "../components/MacroRing.vue";
import SearchBar from "../components/SearchBar.vue";
import MainNav from "../components/MainNav.vue";
import LastLoggedMeals from "../components/LastLoggedMeals.vue";

const store = useFoodStore();

store.setGoal(3000);
store.setEaten(1500);

console.log(store.searchResults);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex justify-center">
      <MacroRing :eaten="store.eaten" :goal="store.goal" />
    </div>
    <div>
      <LastLoggedMeals />
    </div>
    <div class="fixed bottom-28 left-0 right-0 px-4">
      <SearchBar />
    </div>
    <div>
      <MainNav />
    </div>
  </div>
</template>

<style scoped></style>
