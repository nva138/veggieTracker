<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const videoEl = ref();
const reader = new BrowserMultiFormatReader();
const emit = defineEmits(["barcode-detected", "refuse-camera", "close"]);

onMounted(() => {
  reader
    .decodeFromVideoDevice(null, videoEl.value, (result, error) => {
      if (result) emit("barcode-detected", result.getText());
      else if (error && !(error instanceof NotFoundException))
        console.error(error);
    })
    .catch(() => emit("refuse-camera"));
});

onBeforeUnmount(() => {
  reader.reset();
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6"
  >
    <button
      @click="emit('close')"
      type="button"
      class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition"
      aria-label="Close scanner"
    >
      ✕
    </button>

    <h2 class="text-white text-lg font-semibold mb-1">Scan Barcode</h2>
    <p class="text-white/70 text-sm mb-6">Hold the barcode inside the frame</p>

    <div
      class="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-black shadow-2xl"
    >
      <video
        ref="videoEl"
        autoplay
        playsinline
        muted
        class="w-full h-full object-cover"
      ></video>

      <div class="absolute inset-6 pointer-events-none">
        <div
          class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-xl"
        ></div>
        <div
          class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-xl"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-xl"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-xl"
        ></div>
      </div>

      <div
        class="scan-line absolute left-8 right-8 h-0.5 bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.scan-line {
  animation: scan 2.2s ease-in-out infinite alternate;
}

@keyframes scan {
  from {
    top: 10%;
  }
  to {
    top: 90%;
  }
}
</style>
