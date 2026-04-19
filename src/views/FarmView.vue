<script setup>
import MainNav from "../components/global/MainNav.vue";
import { useFoodStore } from "../stores/useFoodStore";

const store = useFoodStore();

const animals = [
  { key: "calf", label: "Calf", emoji: "🐄" },
  { key: "lamb", label: "Lamb", emoji: "🐑" },
  { key: "chicken", label: "Chicken", emoji: "🐔" },
  { key: "piglet", label: "Piglet", emoji: "🐷" },
];
</script>
<template>
  <div class="flex flex-col min-h-screen p-4">
    <h1 class="text-2xl font-bold text-center mb-6 text-white">My Farm</h1>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="animal in animals"
        :key="animal.key"
        class="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4"
      >
        <span class="text-5xl mb-2">{{ animal.emoji }}</span>
        <span class="font-semibold">{{ animal.label }}</span>
        <span class="text-gray-600">× {{ store.inventory[animal.key] ?? 0 }}</span>
      </div>
    </div>
    <MainNav />
  </div>
</template>
