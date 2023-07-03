<template>
  <div class="bg">
    <div>
      <h1>{{ room.roomPassPhrase }}のしりとり</h1>
      <h1>目標: {{ room.chainCount }} / のこり {{ remainingChainCount }}回</h1>
      <h1>始まりの言葉「{{ room.firstWord }}」</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PictureList :wordChains="wordChains" />
      <DrawTool v-show="showDrawingArea" @addWordChain="addWordChain" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomDomain, RoomStatus } from "../../server/models/room";
import { PostWordChainRequest, WordChain } from "../../server/models/wordchain";

const route = useRoute();
const roomId = route.params.roomId as string;

// しりとり部屋のステータス取得
const room = ref({} as RoomDomain);
const getRoom = async () => {
  const res = (await $fetch(`/api/room/${roomId}`, {
    method: "GET",
  })) as RoomDomain;

  room.value = res;
};
onMounted(async () => {
  await getRoom();
});
const showDrawingArea = computed(() => {
  // しりとり部屋のステータスが「プレイ中」「待機中」の場合=true
  return (
    room.value.roomStatus === RoomStatus.Playing ||
    room.value.roomStatus === RoomStatus.Waiting
  );
});

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
// 残り必要なしりとりの回数
const remainingChainCount = computed(() => {
  return room.value.chainCount - wordChains.value.length;
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
    getRoom();
  }
};
</script>

<style scoped>
.bg {
  background-image: url(../assets/image/bglist.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
