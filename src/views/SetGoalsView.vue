<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import MainNav from "../components/global/MainNav.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useFoodStore();

const calories = ref(2000);
const protein = ref(30);
const carbs = ref(40);
const fat = computed(() => 100 - protein.value - carbs.value);

function adjustProteinAndCarbs(changed) {
  if (changed === "protein") {
    if (protein.value + carbs.value > 100) carbs.value = 100 - protein.value;
  }
  if (changed === "carbs") {
    if (carbs.value + protein.value > 100) protein.value = 100 - carbs.value;
  }
}

function saveGoals() {
  store.setGoal(calories.value);
  store.setMacros(protein.value, carbs.value, fat.value);
  router.push("/dashboard");
}
</script>

<template>
  <div class="flex flex-col min-h-screen px-4 pt-6 pb-32">
    <h1 class="text-xl font-bold mb-6">Set daily goal</h1>

    <div class="bg-white/10 rounded-2xl p-4 mb-4">
      <label class="text-sm text-gray-400 mb-1 block">Calories per day</label>
      <div class="flex items-center gap-2">
        <input
          v-model="calories"
          type="number"
          placeholder="2000"
          class="w-full bg-transparent text-2xl font-semibold outline-none"
        />
        <span class="text-gray-400">kcal</span>
      </div>
    </div>

    <div class="bg-white/10 rounded-2xl p-4 mb-6">
      <p class="text-sm text-gray-400 mb-4">Macro distribution</p>

      <div class="flex flex-col gap-4">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Protein</span>
            <span class="text-green-400">{{ Math.floor(protein) }}%</span>
          </div>
          <input
            @input="adjustProteinAndCarbs('protein')"
            v-model.number="protein"
            type="range"
            min="0"
            max="100"
            class="w-full accent-green-500"
          />
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Carbs</span>
            <span class="text-yellow-400">{{ Math.floor(carbs) }}%</span>
          </div>
          <input
            @input="adjustProteinAndCarbs('carbs')"
            v-model.number="carbs"
            type="range"
            min="0"
            max="100"
            class="w-full accent-yellow-400"
          />
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Fat</span>
            <span class="text-red-400">{{ Math.floor(fat) }}%</span>
          </div>
          <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full bg-red-400 rounded-full transition-all"
              :style="{ width: fat + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="saveGoals()"
      class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl"
    >
      Save goal
    </button>

    <MainNav />
  </div>
</template>
