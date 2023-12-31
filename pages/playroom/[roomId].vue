<template>
  <loading v-show="isLoading" />
  <success-pop v-show="isSuccess" @hiddenPop="hiddenPop" />
  <failure-pop v-show="isFailure" @hiddenPop="hiddenPop" />
  <success-make-nft-pop v-show="isSuccessNft" @hiddenPop="hiddenPop" />

  <div class="bg">
    <div class="grid grid-cols-1" style="max-width: 384px; margin: 3rem auto">
      <button class="btn-b" @click="pageReload">
        <div class="relative">
          <chain-result-image :roomStatus="room.roomStatus" />
          <h1 class="text-3xl">{{ room.createUserId }}’s room</h1>
          <div class="hukidashi-right">
            <p>始まりの言葉</p>
          </div>
          「{{ room.firstWord }}」
        </div>
      </button>
      <chain-count-goal
        :chainCount="room.chainCount"
        :remainingChainRate="remainingChainRate"
        :length="wordChains.length"
      />
      <div class="grid grid-cols-1 gap-4">
        <PictureList
          :wordChains="wordChains"
          :roomStatus="room.roomStatus"
          @mintNft="mintNft"
        />
        <DrawTool v-show="showDrawingArea" @addWordChain="addWordChain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mint } from "../../services/contracts/pictureShiritoriCompleteNFT";
import { RoomDomain, RoomStatus } from "../../server/models/room";
import { PostWordChainRequest, WordChain } from "../../server/models/wordchain";

const route = useRoute();
const roomId = route.params.roomId as string;
const isLoading = ref(false);
const isSuccess = ref(false);
const isFailure = ref(false);
const isSuccessNft = ref(false);

const hiddenPop = () => {
  isSuccess.value = false;
  isFailure.value = false;
  isSuccessNft.value = false;
};

const pageReload = () => {
  location.reload();
};

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

// 残り必要なしりとりの回数
const remainingChainRate = computed(() => {
  return (wordChains.value.length / room.value.chainCount) * 100;
});

// 登録
const addWordChain = async (
  postWordChainRequest: PostWordChainRequest,
  fileDataURL: any
) => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append("request", JSON.stringify(postWordChainRequest));
  formData.append("file", fileDataURL);
  const { data, pending, error, refresh } = await useFetch(
    `/api/wordchain/${roomId}`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      getWordChain();
      getRoom();
      return res;
    })
    .finally(() => {
      isLoading.value = false;
    });

  if (data) {
    if (data.value && data.value!.nextRoomStatus === RoomStatus.Failed) {
      isFailure.value = true;
    } else {
      isSuccess.value = true;
    }
    setInterval((_) => {
      isSuccess.value = false;
    }, 5000);
  }
};

// NFTの作成
const mintNft = async (wordChain: WordChain, imageUrl: string) => {
  isLoading.value = true;

  const roomPassPhrase = room.value.roomPassPhrase;
  const res = await mint(
    roomPassPhrase,
    imageUrl,
    `${roomPassPhrase} のしりとりの成功報酬です！\n\n書いたものは「${wordChain.word}」です\nとてもお上手です！`
  ) //  ここまで変更
    .then((res) => {
      getWordChain();
      getRoom();
      return res;
    })
    .finally(() => {
      isLoading.value = false;
      isSuccessNft.value = true;
    });
};
</script>

<style scoped>
.bg {
  background-image: url(../../assets/image/bg.webp);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  overflow: scroll;
}
.hukidashi-right {
  position: relative;
  display: inline-block;
  margin: 1em 15px 0 0;
  padding: 7px 10px;
  min-width: 109px;
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

.hukidashi-right p {
  margin: 0;
  padding: 0;
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
  width: 350px;
  margin: 5px auto;
  background: beige;
}
</style>
