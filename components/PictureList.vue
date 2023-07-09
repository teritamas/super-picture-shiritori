<template>
  <div class="relative">
    <li
      v-for="(wordChain, index) in wordChains"
      :key="wordChain.wordChainId"
      class="mb-10 ml-4"
      style="list-style: none"
    >
      <div class="flex flex-row">
        <div class="basis-1/4">
          <span class="picture">{{ index + 1 }}回目の絵</span>
        </div>
        <div class="basis-1/4"></div>
        <div class="basis-1/2">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              :value="viewOriginalImageToggles[index]"
              @click="
                viewOriginalImageToggles[index] =
                  !viewOriginalImageToggles[index]
              "
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span
              class="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{
                viewOriginalImageToggles[index]
                  ? "生成された画像を表示"
                  : "元の画像を表示"
              }}</span
            >
          </label>
        </div>
      </div>
      <img
        :src="
          viewOriginalImageToggles[index]
            ? getWordChainOriginalImage(wordChain.wordChainId)
            : getWordChainGeneratedImage(wordChain.wordChainId)
        "
        :alt="wordChain.roomId + index"
        class="w-full relative article"
      />
      <div class="flex justify-end">
        <button
          class="block z-10 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          v-if="roomStatus && roomStatus === RoomStatus.Completed"
          @click="mintNft(wordChain)"
        >
          <span
            class="px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            NFTを発行する
          </span>
        </button>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import { RoomStatus } from "../server/models/room";
import { WordChain } from "server/models/wordchain";

const props = defineProps({
  wordChains: {
    type: Array as PropType<WordChain[]>,
    required: true,
  },
  roomStatus: {
    type: String as PropType<RoomStatus | undefined>,
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
  height: 380px;
}

.article {
  background-color: #fff;
  border: solid 2px #000;
  box-shadow: 0 6px 6px -6px #000;
}

.picture {
  position: relative;
  display: inline-block;
  padding: 7px 10px;
  font-size: 10px;
  background: #fff;
  border: solid 3px #555;
  box-sizing: border-box;
  width: 100px;
  z-index: 10;
  font-weight: bold;
  text-align: center;
}

.picture:before {
  content: "";
  position: absolute;
  bottom: -24px;
  left: 50%;
  margin-left: -15px;
  border: 12px solid transparent;
  border-top: 13px solid #fff;
  z-index: 2;
}

.picture:after {
  content: "";
  position: absolute;
  bottom: -30px;
  left: 50%;
  margin-left: -17px;
  border: 14px solid transparent;
  border-top: 14px solid #555;
  z-index: 1;
}

.btn-c {
  padding: 1rem 1rem;
  border: 3px solid #212121;
  border-bottom-width: 8px;
  border-radius: 10px;
  color: #212121;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-image: linear-gradient(45deg, #07fffb 25%, transparent 25%),
    linear-gradient(315deg, #07fffb 25%, #a7fbff 25%);
  background-position: 10px 0, 20px 0, 0 0, 0 0;
  background-size: 20px 20px;
  background-repeat: repeat;
  display: block;
  width: 300px;
  margin: 5px auto 50px;
}
</style>
