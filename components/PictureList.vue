<template>
  <div v-for="wordChain in wordChains" :key="wordChain.wordChainId">
    <p>{{ wordChain }}</p>
    <img :src="getWordChainImage(wordChain.wordChainId)" alt="" />
  </div>
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
