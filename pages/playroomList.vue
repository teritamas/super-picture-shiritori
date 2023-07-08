<template>
  <div class="main">
    <form style="width: 400px; margin: 5rem auto 1rem">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="あいことば"
          required
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
    <div
      class="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center"
    >
      <div v-for="item in rooms" :key="item.roomId">
        <a :href="`/playroom/${item.roomId}`">
          <div class="ribbon16-wrapper btn-b">
            <span v-if="item.roomStatus == 'playing'" class="ribbon16"
              >NOW</span
            >
            <div>
              <p>{{ item.createUserId }}’s room</p>
            </div>
          </div>
        </a>
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

.sub-title {
  font-size: 1rem;
  text-align: center;
  color: lavenderblush;
  font-family: "Mochiy Pop P One", sans-serif;
  position: relative;
  color: #a347ff;
}
.main {
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.bg {
  background-image: url(../assets/image/bglist.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  overflow: scroll;
}

.btn-b {
  padding: 1rem 1rem;
  border: 3px solid #212121;
  border-bottom-width: 8px;
  border-radius: 10px;
  color: #212121;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: block;
  width: 300px;
  margin: 5px auto;
}
.ribbon16-wrapper {
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 10px 0;
  width: 300px;
  background: beige;
  box-sizing: border-box;
}

.ribbon16 {
  display: inline-block;
  position: absolute;
  top: -6px;
  right: 10px;
  margin: 0;
  padding: 10px 0 7px;
  z-index: 2;
  width: 40px;
  text-align: center;
  color: white;
  font-size: 13px;
  background: #fa8383;
  border-radius: 2px 0 0 0;
}

.ribbon16:before {
  position: absolute;
  content: "";
  top: 0;
  right: -5px;
  border: none;
  border-bottom: solid 6px #d07676;
  border-right: solid 5px transparent;
}

.ribbon16:after {
  content: "";
  position: absolute;
  left: 0;
  top: 100%;
  height: 0;
  width: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 10px solid #fa8383;
}
</style>
