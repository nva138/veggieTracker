<script setup>
import { ref } from "vue";
import { request } from "../services/apiService";
import { useRouter } from "vue-router";
import { useFoodStore } from "../stores/useFoodStore";
const store = useFoodStore();
const router = useRouter();

const userName = ref("");
const password = ref("");

async function login() {
  const response = await request("POST", "/users/login", {
    username: userName.value,
    password: password.value,
  });
  console.log(response);
  localStorage.setItem("jwt", response);

  await store.loadMeals();
  router.push("/dashboard");
}
</script>

<template>
  <div class="flex flex-col min-h-screen px-6 py-10 justify-center">
    <div class="flex flex-col items-center mb-8">
      <div
        class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-4xl mb-3"
      >
        🥗
      </div>
      <h1 class="text-2xl font-bold text-gray-800">veggieTracker</h1>
      <p class="text-sm text-gray-600 mt-1">Track your meals, grow your farm</p>
    </div>

    <form
      @submit.prevent="login"
      class="bg-white/10 rounded-2xl p-6 flex flex-col gap-4"
    >
      <div>
        <label class="text-xs text-gray-600 mb-1 block">Username</label>
        <input
          v-model="userName"
          type="text"
          placeholder="your username"
          class="w-full bg-transparent border-b border-gray-300 text-gray-800 placeholder-gray-400 py-2 outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label class="text-xs text-gray-600 mb-1 block">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full bg-transparent border-b border-gray-300 text-gray-800 placeholder-gray-400 py-2 outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        class="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl transition"
      >
        Log in
      </button>
    </form>

    <p class="text-center text-xs text-gray-600 mt-6">
      Don't have an account?
      <a href="#" class="text-green-400 hover:text-green-300 font-medium"
        >Sign up</a
      >
    </p>
  </div>
</template>

<style scoped></style>
