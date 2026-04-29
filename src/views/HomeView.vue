<script setup></script>

<template>
  <div class="flex flex-col min-h-screen px-6 py-10 justify-center">
    <div class="flex flex-col items-center mb-8">
      <div class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-4xl mb-3">
        🥗
      </div>
      <h1 class="text-2xl font-bold text-white">veggieTracker</h1>
      <p class="text-sm text-gray-400 mt-1">Track your meals, grow your farm</p>
    </div>

    <form class="bg-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <label class="text-xs text-gray-400 mb-1 block">Username</label>
        <input
          type="text"
          placeholder="your username"
          class="w-full bg-transparent border-b border-white/20 text-white placeholder-gray-500 py-2 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label class="text-xs text-gray-400 mb-1 block">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          class="w-full bg-transparent border-b border-white/20 text-white placeholder-gray-500 py-2 outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        class="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl transition"
      >
        Log in
      </button>
    </form>

    <p class="text-center text-xs text-gray-400 mt-6">
      Don't have an account?
      <a href="#" class="text-green-400 hover:text-green-300 font-medium">Sign up</a>
    </p>
  </div>
</template>

<style scoped></style>
