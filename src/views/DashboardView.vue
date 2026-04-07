<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import MacroRing from "../components/MacroRing.vue";

const store = useFoodStore();

store.setGoal(2000);
store.setEaten(1500);

store.fetchFood("chicken");
console.log(store.searchResults);
</script>

<template>
  <div class="flex justify-center">
    <MacroRing :eaten="store.eaten" :goal="store.goal" />
  </div>
</template>

<style scoped></style>
