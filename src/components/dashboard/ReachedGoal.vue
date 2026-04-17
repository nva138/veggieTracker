<script setup>
import { useFoodStore } from "../../stores/useFoodStore";
const store = useFoodStore();

const goalAchievedOrNot = () =>
  store.eaten < store.goal + 50 && store.eaten > store.goal - 50
    ? "/src/assets/barn_open_unlocked.svg"
    : "/src/assets/barn_closed_locked.svg";
</script>
<template>
  <img :src="goalAchievedOrNot()" />
</template>
