<template>
  <div>
    <div id="canvas-area">
      <div id="tool-area" class="text-center mt-3 mb-1">
        <div
          class="inline-flex rounded-md shadow-lg"
          style="border: 2px solid #000"
          role="group"
        >
          <button
            @click="penBlack"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="width: 12px; height: 12px; margin-right: 4px; opacity: 1"
              xml:space="preserve"
            >
              <g>
                <path
                  class="st0"
                  d="M392.052,0l-0.642,0.01c0,0,0,0,0.009,0c0,0,0-0.01,0.008,0L392.052,0z"
                ></path>
                <path
                  class="st0"
                  d="M487.66,61.494l-0.037-0.037c-0.056-0.056-0.102-0.111-0.156-0.166h-0.01c-0.064-0.056-0.092-0.092-0.193-0.183l-36.51-36.511c-0.009-0.018-0.028-0.027-0.046-0.046C434.386,8.23,412.811-0.027,391.419,0.01c-21.392-0.037-42.968,8.211-59.308,24.56L297.75,58.931l-13.043,13.033L0,356.681V512h155.327l284.708-284.698l13.042-13.042l34.362-34.37c16.34-16.332,24.588-37.916,24.56-59.299c0.027-21.291-8.156-42.766-24.313-59.06L487.66,61.494z M136.572,466.736h-91.3v-91.299l271.445-271.455l91.299,91.3L136.572,466.736z M455.429,147.878l-21.327,21.318l-91.29-91.299L364.13,56.58c7.578-7.569,17.35-11.279,27.289-11.306c9.938,0.027,19.702,3.738,27.288,11.306l36.722,36.712c7.569,7.587,11.279,17.36,11.298,27.298C466.708,130.528,462.998,140.292,455.429,147.878z"
                ></path>
              </g>
            </svg>
            ペン
          </button>
          <button
            @click="eraser"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              id="icon"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              style="width: 15px; height: 15px; margin-right: 4px; opacity: 1"
              xml:space="preserve"
            >
              <path
                d="M535.6,783.4l14.1,14.1l381.8-381.8L612.2,96.3L230.3,478.2l14.1,14.1L131.3,605.4c-31.2,31.2-31.2,81.9,0,113.1L312.7,900 H760v-40H459L535.6,783.4z M612.2,152.9L875,415.7L549.7,741L286.9,478.2L612.2,152.9z M402.4,860h-73.1L159.6,690.3 c-15.6-15.6-15.6-41,0-56.6l113.1-113.1l234.6,234.6L402.4,860z"
              ></path>
            </svg>

            消しゴム
          </button>
          <button
            @click="clear"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="width: 15px; height: 15px; margin-right: 4px; opacity: 1"
              xml:space="preserve"
            >
              <g>
                <polygon
                  class="st0"
                  points="314.427,151.751 255.996,210.174 197.573,151.751 151.751,197.581 210.173,256.004 151.751,314.427 197.573,360.258 255.996,301.834 314.427,360.258 360.249,314.427 301.827,256.004 360.257,197.581 	"
                ></polygon>
                <path
                  class="st0"
                  d="M437.016,74.992C390.773,28.7,326.607-0.008,256.004,0c-70.61-0.008-134.784,28.7-181.02,74.992C28.7,121.228-0.017,185.394,0,256.004c-0.017,70.602,28.7,134.768,74.984,181.012c46.235,46.292,110.409,75.008,181.02,74.984c70.603,0.024,134.769-28.692,181.012-74.984c46.285-46.244,74.992-110.409,74.984-181.012C512.008,185.394,483.301,121.228,437.016,74.992z M398.728,398.727c-36.613,36.572-86.908,59.1-142.724,59.124c-55.832-0.024-106.118-22.552-142.723-59.124c-36.572-36.613-59.107-86.908-59.124-142.723c0.016-55.832,22.552-106.102,59.124-142.723c36.606-36.564,86.892-59.108,142.723-59.116c55.816,0.008,106.111,22.552,142.724,59.116c36.563,36.622,59.099,86.892,59.116,142.723C457.827,311.82,435.291,362.114,398.728,398.727z"
                ></path>
              </g>
            </svg>

            クリア
          </button>
        </div>
      </div>
      <canvas
        id="myCanvas"
        v-bind:class="{ eraser: canvasMode === 'eraser' }"
        :width="384"
        :height="384"
        @touchstart="touchstart"
        @touchmove="touchDraw"
        @touchend="touchend"
        @mousedown="dragStart"
        @mouseup="dragEnd"
        @mouseout="dragEnd"
        @mousemove="mouseDraw"
      ></canvas>
    </div>

    <div class="text-center">
      <div class="hukidashi-right">
        <label for="word">あなたの答え</label>
      </div>
      <input
        class="d-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        placeholder="あいす"
        v-model="form.word"
      />
      <small class="block bg-white w-80 round-lg m-auto"
        >あなたが書いた絵をひらがなで入力してください<br />
        例）あいす</small
      >
    </div>
    <div class="text-center">
      <button
        :disabled="disabledSubmitButton"
        @click="addWordChain"
        class="btn-c mt-5"
        id="back-button"
      >
        登録
      </button>
    </div>
    <div></div>
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
  context.value.lineWidth = 5;
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
// ボタンのバリデーション
const disabledSubmitButton = computed(() => {
  return form.value.word === "" || canvas.value.toDataURL() === "";
});

const emits = defineEmits(["addWordChain"]);
const addWordChain = async () => {
  if (disabledSubmitButton.value) {
    console.warn("ボタンが無効です");
    return;
  }
  await emits("addWordChain", form.value, canvas.value.toDataURL("image/png"));
  clearFormAndCanvas(); // 画像と入力をクリア
};
const clearFormAndCanvas = () => {
  form.value.word = "";
  clear();
};
</script>

<style scoped>
#myCanvas {
  border: 4px solid #000000;
  background-color: white;
  position: relative;
  background: white;
}

.eraser {
  cursor: url("~/assets/image/eraser.png") 15 15, auto;
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
  border: 2px solid #000;
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
