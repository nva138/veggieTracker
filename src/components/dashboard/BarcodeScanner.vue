<script setup>
import { onMounted, ref } from "vue";
import { BrowserMultiFormatReader } from "@zxing/library";

const videoEl = ref();
const reader = new BrowserMultiFormatReader();
const emit = defineEmits(["barcode-detected"]);

onMounted(() => {
  reader.decodeFromVideoDevice(null, videoEl.value, (result, error) => {
    if (result !== null) emit("barcode-detected", result.getText());
    else console.log(error);
  });
});
</script>

<template>
  <video ref="videoEl"></video>
</template>
