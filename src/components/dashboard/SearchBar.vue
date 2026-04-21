<script setup>
import { useFoodStore } from "../../stores/useFoodStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import BarcodeScanner from "../dashboard/BarcodeScanner.vue";
const router = useRouter();
const store = useFoodStore();
const searchInput = ref("");
const showScanner = ref(false);

function handleSearch() {
  if (store.goal === 0) return "Please enter a Goal!";
  store.fetchFood(searchInput.value);
  router.push("/add-meal");
}

function handleBarcode(barcode) {
  searchInput.value = barcode;
  store.fetchFoodByBarcode(searchInput.value);
  router.push("/add-meal");
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
        :placeholder="
          store.goal === 0 ? 'Please enter a Goal!' : 'Search food...'
        "
        required
      />
      <BarcodeScanner v-if="showScanner" @barcode-detected="handleBarcode" />
      <div class="absolute end-1.5 bottom-1.5 flex gap-1.5">
        <button
          @click="showScanner = !showScanner"
          type="button"
          class="text-green-500 hover:text-green-600 p-1.5 focus:outline-none"
        >
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
              d="M3 9V6a1 1 0 0 1 1-1h3M3 15v3a1 1 0 0 0 1 1h3m11-4v3a1 1 0 0 1-1 1h-3m4-11h-3a1 1 0 0 0-1 1v3M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"
            />
          </svg>
        </button>
        <button
          @click="handleSearch"
          type="button"
          class="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
