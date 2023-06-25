<template>
  <h1>プレイルーム一覧</h1>
  <h2>プレイルームを探す</h2>
  <label for="roomPassPhrase">あいことば</label>
  <input class="" type="text" />
  <div>検索結果</div>
  <a href="/playroom/2">プレイルーム</a>

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

<script lang="ts">
import { useFetch } from "nuxt/app";
import { PostRoomRequest } from "server/models/room";

export default {
  name: "PlayroomList",
  data() {
    return {
      form: {
        roomPassPhrase: "",
        createUserId: "",
        chainCount: 10,
      },
    };
  },
  methods: {
    // 登録
    async addRoom() {
      const request: PostRoomRequest = {
        ...this.form,
      };
      await useFetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
    },
  },
};
</script>
