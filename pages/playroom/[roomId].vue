<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2>Draw Tool</h2>
    <PictureList :wordChains="wordChains" />
    <DrawTool @addWordChain="addWordChain" />
  </div>
</template>

<script setup lang="ts">
import { PostWordChainRequest, WordChain } from "server/models/wordchain";

const route = useRoute();
const roomId = route.params.roomId as string;

// 一覧取得
const wordChains = ref([] as WordChain[]);
const getWordChain = async () => {
  const res = (await $fetch(`/api/wordchain/${roomId}`, {
    method: "GET",
  })) as WordChain[];

  wordChains.value = res;
};
onMounted(async () => {
  await getWordChain();
});

// 登録
const addWordChain = async (
  postWordChainRequest: PostWordChainRequest,
  fileDataURL: any
) => {
  const formData = new FormData();
  formData.append("request", JSON.stringify(postWordChainRequest));
  formData.append("file", fileDataURL);
  const { data, pending, error, refresh } = await useFetch(
    `/api/wordchain/${roomId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (data) {
    getWordChain();
  }
};
</script>
