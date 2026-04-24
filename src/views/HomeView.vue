<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.replace({ name: "Dashboard" });
});
</script>

<template>
  <h1 class="text-3xl font-bold underline">Login</h1>
</template>

<style scoped></style>
