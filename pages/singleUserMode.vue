<template>
  <div class="bg">
    <div class="main"></div>
    <h1 class="title">一人対戦</h1>
    <div class="text-center">
      <button class="btn-c mt-5" id="back-button" @click="addSingleUserRoom">
        一人対戦を開始する
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PostSingleUserRoomRequest,
  PostSingleUserRoomResponse,
} from "server/models/singleUserRoom";

// AIとの対戦ルームを作成する
const form = reactive({
  chainCount: 10,
}) as PostSingleUserRoomRequest;
const addSingleUserRoom = async () => {
  try {
    // レスポンスを取得
    const res = await useFetch("/api/singleUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });
    const response = res.data.value as unknown as PostSingleUserRoomResponse;
    if (response.singleUserRoomId) {
      // プレイルーム画面に遷移
      navigateTo(`/singleUserRoom/${response.singleUserRoomId}`);
    }
  } catch (err) {
    // エラーハンドリング
    console.error(err);
  }
};
</script>

<style>
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
