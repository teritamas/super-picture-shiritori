<template>
  <div class="main">
    <div>
      <h2 class="title mt-12">ルームを作成</h2>
      <div class="text-center">
        <div class="hukidashi-right">
          <label for="roomPassPhrase">目標設定</label>
        </div>
        <input
          class="d-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="10"
          style="border: 2px solid #000"
          v-model="form.chainCount"
        />
        <small class="block"
          >しりとりをつなげる回数を入力してください。例）10</small
        >
      </div>
      <div class="text-center">
        <div class="hukidashi-right">
          <label for="chainCount">あいことば</label>
        </div>
        <input
          class="d-input bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style="border: 2px solid #000"
          type="text"
          v-model="form.roomPassPhrase"
          placeholder="あいことば"
        />
      </div>
      <div class="text-center">
        <div class="hukidashi-right">
          <label for="createUserId">ユーザ名</label>
        </div>
        <input
          class="d-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          style="border: 2px solid #000"
          v-model="form.createUserId"
          placeholder="ニックネーム"
        />
      </div>
      <div class="text-center">
        <button class="btn-c mt-5" id="back-button" @click="addRoom">
          送信
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap");

.title {
  font-size: 3rem;
  text-align: center;
  color: lavenderblush;
  font-family: "Mochiy Pop P One", sans-serif;
  position: relative;
  padding: 15px;
  color: #a347ff;
  margin-bottom: 0.2rem;
  overflow: hidden;
  font-family: impact;
  text-shadow: 0px 0px #272826, 1px 1px #272826, 2px 2px #272826,
    3px 3px #272826, 4px 4px #272826, 5px 5px #272826, 6px 6px #272826,
    7px 7px #272826, 8px 8px #272826, 9px 9px #272826, 10px 10px #272826,
    11px 11px #272826, 12px 12px #272826, 13px 13px #272826, 14px 14px #272826,
    15px 15px #272826, 16px 16px #272826;
  font-weight: bold;
}

.main {
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.bg {
  background-image: url(../assets/image/bg.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

.hukidashi-right {
  position: relative;
  display: inline-block;
  margin: 1em 15px 0 0;
  padding: 7px 10px;
  min-width: 100px;
  max-width: 100%;
  font-size: 14px;
  background: #fff;
  border: solid 3px #555;
  box-sizing: border-box;
  text-align: center;
}

.hukidashi-right:before {
  content: "";
  position: absolute;
  top: 50%;
  right: -24px;
  margin-top: -12px;
  border: 12px solid transparent;
  border-left: 13px solid #fff;
  z-index: 2;
}

.hukidashi-right:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -30px;
  margin-top: -14px;
  border: 14px solid transparent;
  border-left: 14px solid #555;
  z-index: 1;
}

.d-input {
  width: 200px;
  display: inline;
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
