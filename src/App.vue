<script setup>
import { useFoodStore } from "./stores/useFoodStore";
import { onMounted } from "vue";

const store = useFoodStore();

onMounted(() => {
  if (localStorage.getItem("jwt")) store.loadMeals();
});
</script>

<template>
  <RouterView />
</template>
