<template>
  <ol class="relative scroll">
    <li
      v-for="(wordChain, index) in wordChains"
      :key="wordChain.wordChainId"
      class="mb-10 ml-4"
    >
      <div
        class="absolute w-3 h-3 bg-gray-800 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
      ></div>
      <p>{{ index }}回目の絵</p>
      <img
        :src="getWordChainImage(wordChain.wordChainId)"
        :alt="wordChain.roomId + index"
        class="w-full relative article"
      />
    </li>
  </ol>
</template>

<script setup lang="ts">
import { WordChain } from "server/models/wordchain";

const props = defineProps({
  wordChains: {
    type: Array as PropType<WordChain[]>,
    required: true,
  },
});

// 画像取得
const runtimeConfig = useRuntimeConfig();
const getWordChainImage = (wordChainId: string) => {
  return `${runtimeConfig.public.baseUrl}/api/wordchain/image/${wordChainId}`;
};
</script>

<style>
ol {
  border-left: black 1px solid;
}

.scroll {
  overflow-x: scroll;
  height: 100vh;
}

.article {
  background-color: #fff;
  border: solid 2px #000;
  box-shadow: 0 6px 6px -6px #000;
}
</style>
