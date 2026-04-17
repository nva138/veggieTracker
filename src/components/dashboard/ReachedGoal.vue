<script setup>
import { useFoodStore } from "../../stores/useFoodStore";
import barnOpen from "../../assets/barn_open_unlocked.svg";
import barnClosed from "../../assets/barn_closed_locked.svg";

const store = useFoodStore();

const goalAchievedOrNot = () =>
  store.eaten < store.goal + 50 && store.eaten > store.goal - 50
    ? barnOpen
    : barnClosed;
</script>
<template>
  <img :src="goalAchievedOrNot()" />
</template>
