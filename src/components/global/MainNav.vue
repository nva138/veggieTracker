<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <div class="fixed bottom-0 left-0 right-0 bg-green-500 rounded-t-3xl px-6 pt-4 pb-6">
    <ul class="flex justify-around">
      <li>
        <RouterLink to="/dashboard" class="flex flex-col items-center text-white hover:text-white/80 text-xs gap-1">
          <span class="text-lg">🏠</span>
          Dashboard
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/food-diary" class="flex flex-col items-center text-white hover:text-white/80 text-xs gap-1">
          <span class="text-lg">📖</span>
          Food Diary
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/set-goals" class="flex flex-col items-center text-white hover:text-white/80 text-xs gap-1">
          <span class="text-lg">🎯</span>
          Goals
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/farm" class="flex flex-col items-center text-white hover:text-white/80 text-xs gap-1">
          <span class="text-lg">🐄</span>
          Farm
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
