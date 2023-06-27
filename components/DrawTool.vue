<template>
  <div>
    <h2>DrowTool</h2>
    <div v-for="wordChain in wordChains" :key="wordChain.wordChainId">
      <p>{{ wordChain }}</p>
    </div>
    <div id="canvas-area">
      <canvas
        id="myCanvas"
        v-bind:class="{ eraser: canvasMode === 'eraser' }"
        width="340px"
        height="340px"
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

<script setup>
defineProps({
  roomId: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  name: "DrawTool",
  data() {
    return {
      form: {
        word: "",
      },
      canvasMode: "penBlack",
      canvas: null,
      context: null,
      isDrag: false,
      mousePos: null,
      lastPos: this.mousePos,
      wordChains: [],
    };
  },
  mounted() {
    this.getWordChain();
    this.canvas = document.querySelector("#myCanvas");
    this.context = this.canvas.getContext("2d");
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
    this.context.strokeStyle = "#000000";
  },
  methods: {
    // 登録
    async addWordChain() {
      const formData = new FormData();
      formData.append("request", JSON.stringify({ ...this.form }));
      formData.append("file", this.canvas.toDataURL("image/png"));
      const { data, pending, error, refresh } = await useFetch(
        `/api/wordchain/${this.roomId}`,
        {
          method: "POST",
          body: formData,
        }
      );
    },
    async getWordChain() {
      const { data, pending, error, refresh } = await useFetch(
        `/api/wordchain/${this.roomId}`,
        {
          method: "GET",
        }
      );
      this.wordChains = data;
    },
    // ペンモード（黒）
    penBlack: function () {
      // カーソル変更
      this.canvasMode = "penBlack";

      // 描画設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#000000";
    },
    // ペンモード（赤）
    penRed: function () {
      // カーソル変更
      this.canvasMode = "penRed";

      // 描画設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#FF0000";
    },
    // ペンモード（青）
    penBlue: function () {
      // カーソル変更
      this.canvasMode = "penBlue";

      // 描画設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#0000FF";
    },

    // 消しゴムモード
    eraser: function () {
      // カーソル変更
      this.canvasMode = "eraser";

      // 描画設定
      this.context.lineCap = "square";
      this.context.lineJoin = "square";
      this.context.lineWidth = 30;
      this.context.strokeStyle = "#FFFFFF";
    },
    // 描画
    mouseDraw: function (e) {
      var x = e.layerX;
      var y = e.layerY;

      if (!this.isDrag) {
        return;
      }
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    // 描画開始（mousedown）
    dragStart: function (e) {
      var x = e.layerX;
      var y = e.layerY;

      this.context.beginPath();
      this.context.lineTo(x, y);
      this.context.stroke();

      this.isDrag = true;
    },
    // 描画終了（mouseup, mouseout）
    dragEnd: function () {
      this.context.closePath();
      this.isDrag = false;
    },
    // クリア
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // 画像ダウンロード
    download: function () {
      let link = document.createElement("a");
      link.href = this.canvas.toDataURL("image/png");
      link.download = "canvas-" + new Date().getTime() + ".png";
      link.click();
    },
    touchstart: function (e) {
      this.noScroll(e);

      this.mousePos = this.getTouchPos(this.canvas, e);
      this.lastPos = this.mousePos;

      this.context.beginPath();
      this.context.lineTo(this.mousePos.x, this.mousePos.y);
      this.context.stroke();

      this.isDrag = true;
    },
    touchDraw: function (e) {
      this.noScroll(e);

      if (!this.isDrag) {
        return;
      }

      this.context.moveTo(this.lastPos.x, this.lastPos.y);
      this.mousePos = this.getTouchPos(this.canvas, e);

      this.context.lineTo(this.mousePos.x, this.mousePos.y);
      this.context.stroke();
      this.lastPos = this.mousePos;
    },
    touchend: function (e) {
      this.noScroll(e);

      this.context.closePath();
      this.isDrag = false;
    },
    getTouchPos: function (canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top,
      };
    },
    noScroll: function (e) {
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
#myCanvas {
  border: 1px solid #000000;
  position: relative;
}

.eraser {
  cursor: url("~/assets/image/eraser.png") 15 15, auto;
}
</style>
