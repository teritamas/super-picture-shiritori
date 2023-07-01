<template>
  <h1>プレイルーム一覧</h1>
  <h2>プレイルームを探す</h2>
  <label for="roomPassPhrase">あいことば</label>
  <input class="" type="text" />
  <div>検索結果</div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
    <div v-for="item in rooms" :key="item.roomId">
      <div>
        <a
          :href="`/playroom/${item.roomId}`"
          class="block max-w-sm p-6 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          style="
            background-image: url('./assets/image/neco.png'); /* 背景画像指定 */
            background-repeat: no-repeat; /* 背景の繰り返し設定 */
            background-position: right center; 背景の位置指定
          "
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <!--{{ item.roomPassPhrase }}-->
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Created By: {{ item.createUserId }}
          </p>
        </a>
      </div>
    </div>
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
  const response = res.data.value as PostRoomResponse;
  if (response.roomId) {
    await getRooms();
    // プレイルーム画面に遷移
    navigateTo(`/playroom/${response.roomId}`);
  }
};
</script>
