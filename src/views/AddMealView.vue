<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import SearchBar from "../components/dashboard/SearchBar.vue";
import AddMealModal from "../components/addMeal/AddMealModal.vue";
import { ref } from "vue";

const store = useFoodStore();
const selectedFood = ref(null);

const resetRefValue = () => (selectedFood.value = 0);
</script>

<template>
  <div @click="resetRefValue">
    <div
      class="w-[92%] mx-auto mt-4 rounded-2xl shadow-lg bg-white/10 overflow-y-auto max-h-[calc(100vh-10rem)]"
    >
      <ul class="divide-y divide-white/10">
        <li
          v-for="food in store.searchResults"
          class="flex items-center justify-between px-4 py-3"
        >
          <div>
            <p class="text-sm font-medium">{{ food.product_name }}</p>
            <p class="text-xs text-gray-400">
              {{ Math.round(food.nutriments?.["energy-kcal_100g"]) }} kcal ·
              {{ Math.round(food.nutriments?.proteins_100g) }}g Protein · per
              100g
            </p>
          </div>
          <button
            class="text-xs bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1.5 rounded-lg"
            @click="selectedFood = food"
            @click.stop
          >
            Add
          </button>
        </li>
      </ul>
    </div>

    <div class="fixed bottom-16 left-0 right-0 px-4">
      <SearchBar />
    </div>
    <AddMealModal
      v-if="selectedFood"
      :food="selectedFood"
      @resetRefValue="resetRefValue"
    />
  </div>
  <MainNav />
</template>

<style scoped></style>
