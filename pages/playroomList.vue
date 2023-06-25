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

<script lang="ts">
import { useFetch } from "nuxt/app";
import { PostRoomRequest, RoomDomain } from "server/models/room";

export default {
  name: "PlayroomList",
  data() {
    return {
      form: {
        roomPassPhrase: "",
        createUserId: "",
        chainCount: 10,
      },
      rooms: [] as RoomDomain[],
    };
  },
  created() {
    this.getRooms();
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
    async getRooms() {
      await useFetch("/api/room", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        const data = res.data.value as SerializeObject<RoomDomain>[];
        this.rooms = data.map((room) => {
          const roomDomain = { ...room } as RoomDomain;
          return roomDomain;
        });
      });
    },
  },
};
</script>
