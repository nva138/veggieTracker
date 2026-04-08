<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import MacroRing from "../components/MacroRing.vue";
import SearchBar from "../components/SearchBar.vue";

const store = useFoodStore();

store.setGoal(2000);
store.setEaten(1500);
</script>

<template>
  <div class="flex justify-center">
    <MacroRing :eaten="store.eaten" :goal="store.goal" />
  </div>
  <div>
    <SearchBar />
  </div>
</template>

<style scoped></style>
