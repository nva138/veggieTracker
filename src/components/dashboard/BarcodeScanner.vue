<script setup>
import { onMounted, ref } from "vue";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const videoEl = ref();
const reader = new BrowserMultiFormatReader();
const emit = defineEmits(["barcode-detected", "refuse-camera"]);

onMounted(() => {
  reader
    .decodeFromVideoDevice(null, videoEl.value, (result, error) => {
      if (result) emit("barcode-detected", result.getText());
      else if (error && !(error instanceof NotFoundException)) console.error(error);
    })
    .catch(() => emit("refuse-camera"));
});
</script>

<template>
  <video ref="videoEl"></video>
</template>
