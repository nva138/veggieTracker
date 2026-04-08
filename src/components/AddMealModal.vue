<script setup>
const props = defineProps(["food"]);
</script>
<template>
  <div class="fixed inset-0 bg-black/60 flex items-start justify-center z-50 pt-10">
    <div
      class="relative w-[92%] h-3/4 bg-white rounded-2xl shadow-xl flex flex-col p-5"
    >
      <button class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="flex-1 mt-4"></div>

      <div class="flex justify-end">
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl"
        >
          Log Meal
        </button>
      </div>
    </div>
  </div>
</template>
