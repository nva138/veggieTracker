<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useFoodStore();
const searchInput = ref("");

function handleSearch() {
  if (store.goal === 0) return;
  store.fetchFood(searchInput.value);
  router.push("/add-meal");
  console.log(store.searchResults);
}
</script>
<template>
  <form class="max-w-md mx-auto">
    <label
      for="search"
      class="block mb-2.5 text-sm font-medium text-heading sr-only"
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-body"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        @keyup.enter="handleSearch"
        v-model="searchInput"
        type="search"
        id="search"
        class="block w-full p-3 ps-9 bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400"
        placeholder="Search"
        required
      />
      <button
        @click="handleSearch"
        type="button"
        class="absolute end-1.5 bottom-1.5 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
      >
        Search
      </button>
    </div>
  </form>
</template>
<style scoped></style>
