<template>
  <div class="main">
    <div>
      <h2 class="title mt-12">ルームを作成</h2>
      <PrimaryInputArea
        v-model:inputValue="form.chainCount"
        :label="'目標設定'"
        :placeholder="'10'"
        :informationMessage="'しりとりをつなげる回数を入力してください。例）10'"
      />
      <PrimaryInputArea
        v-model:inputValue="form.createUserId"
        :label="'ユーザ名'"
        :placeholder="'ニックネーム'"
      />
      <PrimaryInputArea
        v-model:inputValue="form.roomPassPhrase"
        :label="'あいことば'"
        :placeholder="'あいことばを入力'"
      />
      <div class="text-center">
        <button class="btn-c mt-5" id="back-button" @click="addRoom">
          ルームを作る
        </button>
      </div>
    </div>
    <PrimaryButton :buttonText="'→ルームを探して遊ぶ'" :to="'/playroomList'" />
  </div>
  <div class="bg"></div>
</template>

<script setup lang="ts">
import { PostRoomResponse, RoomDomain } from "server/models/room";

// プレイルーム一覧
const rooms = ref([] as RoomDomain[]);
const getRooms = async () => {
  try {
    // レスポンスを取得
    const res = await $fetch("/api/room", {
      // useFetchだとnullが発生する時がある
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = res as unknown as RoomDomain[];
    rooms.value = responseData.map((room) => {
      const roomDomain = { ...room } as RoomDomain;
      return roomDomain;
    });
  } catch (err) {
    // エラーハンドリング
    console.error(err);
  }
};
onMounted(async () => {
  await getRooms();
});

// プレイルームの新規登録
const form = reactive({
  roomPassPhrase: "",
  createUserId: "",
  chainCount: 10,
});
const addRoom = async () => {
  const res = await useFetch("/api/room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form }),
  });
  const response = res.data.value as PostRoomResponse;
  if (response.roomId) {
    await getRooms();
    // プレイルーム画面に遷移
    navigateTo(`/playroom/${response.roomId}`);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap");
.main {
  position: absolute;
  height: 100vh;
  width: 100vw;
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
  margin: 20px auto;
}
</style>
