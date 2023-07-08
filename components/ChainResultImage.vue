<template>
  <img
    class="result-img"
    v-if="roomStatus == 'failed'"
    src="@/assets/image/omg.png"
    alt="失敗したときの画像"
  />
  <img
    class="result-img"
    v-if="roomStatus == 'completed'"
    src="@/assets/image/nice.png"
    alt="失敗したときの画像"
  />
</template>

<script>
export default {
  name: "chain-result-image",
  data() {
    return {};
  },
  props: ["roomStatus"],
  components: {},
  mounted() {},
  updated() {},
  methods: {},
};
</script>
<style>
.result-img {
  position: absolute;
  top: 77px;
  z-index: 12;
}
</style>
