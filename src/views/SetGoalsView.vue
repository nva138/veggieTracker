<script setup></script>

<template>
  <div class="flex flex-col min-h-screen px-4 pt-6 pb-32">
    <h1 class="text-xl font-bold mb-6">Wochenziel setzen</h1>

    <div class="bg-white/10 rounded-2xl p-4 mb-4">
      <label class="text-sm text-gray-400 mb-1 block">Kalorien pro Tag</label>
      <div class="flex items-center gap-2">
        <input
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
            <span class="text-green-400">30%</span>
          </div>
          <input
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
            <span class="text-yellow-400">40%</span>
          </div>
          <input
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
            <span class="text-red-400">30%</span>
          </div>
          <input
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
      class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl"
    >
      Ziel speichern
    </button>
  </div>

  <MainNav />
</template>
