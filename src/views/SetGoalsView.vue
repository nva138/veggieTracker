<script setup>
import { useFoodStore } from "../stores/useFoodStore";
import MainNav from "../components/MainNav.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useFoodStore();

const calories = ref(2000);
const protein = ref(30);
const carbs = ref(40);
const fat = ref(30);

function adjustMacros(changed) {
  if (changed === "protein") {
    const rest = 100 - protein.value;
    const totalOthers = carbs.value + fat.value;
    if (totalOthers > 0) {
      const carbRatio = carbs.value / totalOthers;
      const fatRatio = fat.value / totalOthers;
      carbs.value = rest * carbRatio;
      fat.value = rest * fatRatio;
    } else {
      carbs.value = rest / 2;
      fat.value = rest / 2;
    }
  }

  if (changed === "carbs") {
    const rest = 100 - carbs.value;
    const totalOthers = protein.value + fat.value;
    if (totalOthers > 0) {
      const proteinRatio = protein.value / totalOthers;
      const fatRatio = fat.value / totalOthers;
      protein.value = rest * proteinRatio;
      fat.value = rest * fatRatio;
    } else {
      protein.value = rest / 2;
      fat.value = rest / 2;
    }
  }

  if (changed === "fat") {
    const rest = 100 - fat.value;
    const totalOthers = protein.value + carbs.value;
    if (totalOthers > 0) {
      const proteinRatio = protein.value / totalOthers;
      const carbRatio = carbs.value / totalOthers;
      protein.value = rest * proteinRatio;
      carbs.value = rest * carbRatio;
    } else {
      protein.value = rest / 2;
      carbs.value = rest / 2;
    }
  }
}

function saveGoals() {
  store.setGoal(calories.value);
  store.setMacros(protein.value, carbs.value, fat.value);
  router.push("/dashboard");
  console.log(store.goal, protein.value, carbs.value, fat.value);
}
</script>

<template>
  <div class="flex flex-col min-h-screen px-4 pt-6 pb-32">
    <h1 class="text-xl font-bold mb-6">Wochenziel setzen</h1>

    <div class="bg-white/10 rounded-2xl p-4 mb-4">
      <label class="text-sm text-gray-400 mb-1 block">Kalorien pro Tag</label>
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
      <p class="text-sm text-gray-400 mb-4">Makroverteilung</p>

      <div class="flex flex-col gap-4">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Protein</span>
            <span class="text-green-400">{{ Math.floor(protein) }}%</span>
          </div>
          <input
            @input="adjustMacros('protein')"
            v-model="protein"
            type="range"
            min="0"
            max="100"
            value="30"
            class="w-full accent-green-500"
          />
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Kohlenhydrate</span>
            <span class="text-yellow-400">{{ Math.floor(carbs) }}%</span>
          </div>
          <input
            @input="adjustMacros('carbs')"
            v-model="carbs"
            type="range"
            min="0"
            max="100"
            value="40"
            class="w-full accent-yellow-400"
          />
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Fett</span>
            <span class="text-red-400">{{ Math.floor(fat) }}%</span>
          </div>
          <input
            @input="adjustMacros('fat')"
            v-model="fat"
            type="range"
            min="0"
            max="100"
            value="30"
            class="w-full accent-red-400"
          />
        </div>
      </div>

      <div class="mt-4 text-center text-sm text-gray-400">
        Gesamt: <span class="text-white font-medium">100%</span>
      </div>
    </div>

    <button
      @click="saveGoals()"
      class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl"
    >
      Ziel speichern
    </button>

    <MainNav />
  </div>
</template>
