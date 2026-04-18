<script setup>
import { useFoodStore } from "../../stores/useFoodStore";
import barnOpen from "../../assets/barn_open_unlocked.svg";
import barnClosed from "../../assets/barn_closed_locked.svg";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();

const store = useFoodStore();

const isGoalAchieved = computed(() => {
  return (
    store.eaten < store.goal + 50 &&
    store.eaten > store.goal - 50 &&
    store.goal !== 0
  );
});

const imageSrc = computed(() => (isGoalAchieved.value ? barnOpen : barnClosed));

const goalAchieved = () => {
  if (isGoalAchieved.value) {
    router.push("/farm");
  }
};
</script>
<template>
  <img :src="imageSrc" @click="goalAchieved" />
</template>
