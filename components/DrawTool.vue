<template>
  <div>
    <div id="canvas-area">
      <canvas
        id="myCanvas"
        v-bind:class="{ eraser: canvasMode === 'eraser' }"
        width="512px"
        height="512px"
        @touchstart="touchstart"
        @touchmove="touchDraw"
        @touchend="touchend"
        @mousedown="dragStart"
        @mouseup="dragEnd"
        @mouseout="dragEnd"
        @mousemove="mouseDraw"
      ></canvas>
    </div>
    <div id="tool-area">
      <button id="pen-black-button" @click="penBlack">ペン（黒）</button>
      <button id="pen-red-button" @click="penRed">ペン（赤）</button>
      <button id="pen-blue-button" @click="penBlue">ペン（青）</button>
      <button id="eraser-button" @click="eraser">消しゴム</button>
      <button id="clear-button" @click="clear">クリア</button>
      <button id="download-button" @click="download">ダウンロード</button>
    </div>
    <div>
      <label for="word">あなたの答え</label>
      <input class="" type="text" v-model="form.word" />
      <button id="add-word-chain-button" @click="addWordChain">登録</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// キャンバスの設定
const canvasMode = ref("penBlack");
const canvas = ref();
const context = ref();
const isDrag = ref(false);
const mousePos = ref();
const lastPos = ref(mousePos);
onMounted(() => {
  canvas.value = document.querySelector("#myCanvas");
  context.value = canvas.value.getContext("2d");
  context.value.fillStyle = "#FFFFFF";
  context.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
  context.value.lineCap = "round";
  context.value.lineJoin = "round";
  context.value.lineWidth = 30;
  context.value.strokeStyle = "#000000";
});
const penBlack = () => {
  // カーソル変更
  canvasMode.value = "penBlack";

  // 描画設定
  context.value.lineCap = "round";
  context.value.lineJoin = "round";
  context.value.lineWidth = 5;
  context.value.strokeStyle = "#000000";
};
const penRed = () => {
  // カーソル変更
  canvasMode.value = "penRed";

  // 描画設定
  context.value.lineCap = "round";
  context.value.lineJoin = "round";
  context.value.lineWidth = 5;
  context.value.strokeStyle = "#FF0000";
};
const penBlue = () => {
  // カーソル変更
  canvasMode.value = "penBlue";

  // 描画設定
  context.value.lineCap = "round";
  context.value.lineJoin = "round";
  context.value.lineWidth = 5;
  context.value.strokeStyle = "#0000FF";
};
const eraser = () => {
  // カーソル変更
  canvasMode.value = "eraser";

  // 描画設定
  context.value.lineCap = "square";
  context.value.lineJoin = "square";
  context.value.lineWidth = 30;
  context.value.strokeStyle = "#FFFFFF";
};
const mouseDraw = (e: any) => {
  const x = e.layerX;
  const y = e.layerY;

  if (!isDrag.value) {
    return;
  }
  context.value.lineTo(x, y);
  context.value.stroke();
};
const dragStart = (e: any) => {
  const x = e.layerX;
  const y = e.layerY;

  context.value.beginPath();
  context.value.lineTo(x, y);
  context.value.stroke();

  isDrag.value = true;
};
const dragEnd = () => {
  context.value.closePath();
  isDrag.value = false;
};
// クリア
const clear = () => {
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
};
// 画像ダウンロード
const download = () => {
  const link = document.createElement("a");
  link.href = canvas.value.toDataURL("image/png");
  link.download = "canvas-" + new Date().getTime() + ".png";
  link.click();
};
// タッチイベント
const touchstart = (e: any) => {
  noScroll(e);

  mousePos.value = getTouchPos(canvas.value, e);
  lastPos.value = mousePos.value;

  context.value.beginPath();
  context.value.lineTo(mousePos.value.x, mousePos.value.y);
  context.value.stroke();

  isDrag.value = true;
};
const touchDraw = (e: any) => {
  noScroll(e);

  if (!isDrag.value) {
    return;
  }

  context.value.moveTo(lastPos.value.x, lastPos.value.y);
  mousePos.value = getTouchPos(canvas.value, e);

  context.value.lineTo(mousePos.value.x, mousePos.value.y);
  context.value.stroke();
  lastPos.value = mousePos.value;
};
const touchend = (e: any) => {
  noScroll(e);

  context.value.closePath();
  isDrag.value = false;
};
const getTouchPos = function (canvasDom: any, touchEvent: any) {
  const rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  };
};
const noScroll = (e: any) => {
  e.preventDefault();
};

import { PostWordChainRequest } from "server/models/wordchain";

// 登録
const form = ref({
  word: "",
} as PostWordChainRequest);

const emits = defineEmits(["addWordChain"]);
const addWordChain = async () => {
  await emits("addWordChain", form, canvas.value.toDataURL("image/png"));
  clearFormAndCanvas(); // 画像と入力をクリア
};
const clearFormAndCanvas = () => {
  form.value.word = "";
  clear();
};
</script>

<style scoped>
#myCanvas {
  border: 1px solid #000000;
  background-color: white;
  position: relative;
  background: white;
}

.eraser {
  cursor: url("~/assets/image/eraser.png") 15 15, auto;
}
</style>
