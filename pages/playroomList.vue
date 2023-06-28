<template>
  <h1>プレイルーム一覧</h1>
  <h2>プレイルームを探す</h2>
  <label for="roomPassPhrase">あいことば</label>
  <input class="" type="text" />
  <div>検索結果</div>
  <div v-for="item in rooms" :key="item.roomId">
    <a :href="`/playroom/${item.roomId}`"
      >{{ item.roomPassPhrase }} - 作成者: {{ item.createUserId }}
    </a>
  </div>

  <h2>プレイルームを作る</h2>
  <label for="roomPassPhrase">目標設定</label>
  <input class="" type="text" v-model="form.chainCount" />回
  <label for="chainCount">あいことば</label>
  <input class="" type="text" v-model="form.roomPassPhrase" />
  <label for="createUserId">ユーザ名</label>
  <input class="" type="text" v-model="form.createUserId" />
  <div>
    <button id="back-button" @click="addRoom">送信</button>
  </div>
</template>

<script setup lang="ts">
import { RoomDomain } from "server/models/room";

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

    const responseData = res as RoomDomain[];
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
  if (res.data) {
    await getRooms();
  }
};
</script>
