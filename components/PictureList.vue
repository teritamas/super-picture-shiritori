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
      <p>
        {{ index + 1 }}回目の絵
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :value="viewOriginalImageToggles[index]"
            @click="
              viewOriginalImageToggles[index] = !viewOriginalImageToggles[index]
            "
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span
            class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >{{
              viewOriginalImageToggles[index]
                ? "生成された画像を表示"
                : "元の画像を表示"
            }}</span
          >
        </label>
        <button @click="mintNft(wordChain)">NFT発行</button>
      </p>
      <img
        :src="
          viewOriginalImageToggles[index]
            ? getWordChainOriginalImage(wordChain.wordChainId)
            : getWordChainGeneratedImage(wordChain.wordChainId)
        "
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
const viewOriginalImageToggles = ref([] as boolean[]);
onMounted(() => {
  viewOriginalImageToggles.value = props.wordChains.map(() => false);
});
const runtimeConfig = useRuntimeConfig();
const getWordChainGeneratedImage = (wordChainId: string) => {
  return `${runtimeConfig.public.baseUrl}api/wordchain/image/${wordChainId}?type=generated`;
};
const getWordChainOriginalImage = (wordChainId: string) => {
  return `${runtimeConfig.public.baseUrl}api/wordchain/image/${wordChainId}?type=original`;
};

// NFTの作成
const emits = defineEmits(["mintNft"]);
const mintNft = async (wordChain: WordChain) => {
  await emits(
    "mintNft",
    wordChain,
    getWordChainGeneratedImage(wordChain.wordChainId)
  );
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
