<template>
  <div class="full-view">
    <div class="inner">
      <img src="@/assets/image/good.png" alt="NICE" />
      <p class="text-white mb-4 text-4xl font-extrabold text-center">成功！</p>

      <button
        class="block btn-c relative z-10 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        @click="$emit('hiddenPop')"
      >
        <span
          class="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
        >
          プレイ画面に戻る
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "success-pop",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  updated() {},
  methods: {},
};
</script>

<style scoped>
.full-view {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
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
  width: 250px;
  margin: 5px auto;
}
</style>
