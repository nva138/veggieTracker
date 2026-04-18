<script setup>
import MainNav from "../components/global/MainNav.vue";
import { useFoodStore } from "../stores/useFoodStore";

const store = useFoodStore();
</script>
<template>
  <p>{{ store.chickens }}</p>
  <MainNav />
</template>
