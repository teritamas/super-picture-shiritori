<template>
  <div class="mx-5 md:mr-10 md:mt-5 mb-5">
    <span class="name">目標 {{ chainCount }} 回</span>
    <div class="bar-graph-wrap">
      <div class="graph yellow" :style="'width:' + remainingChainRate + '%'">
        <span class=""></span>
        <span class="number"> {{ length }} 回</span>
      </div>
    </div>
    <div class="contents"></div>
  </div>
</template>

<script>
export default {
  name: "chain-goal",
  data() {
    return {};
  },
  props: ["chainCount", "length", "remainingChainRate"],
  components: {},
  mounted() {},
  updated() {},
  methods: {},
};
</script>
<style>
/*------------------------------------
  bar graph
------------------------------------*/
.number {
  color: black;
  z-index: 5;
  font-size: 22px;
  display: inline-block;
  white-space: nowrap;
}

.name {
  position: relative;
  display: block;
  padding: 7px 10px;
  font-size: 16px;
  background: #fff;
  border: solid 3px #555;
  box-sizing: border-box;
  margin: 0 0 0 auto;
  width: 100px;
  z-index: 10;
}

.name:before {
  content: "";
  position: absolute;
  bottom: -24px;
  left: 50%;
  margin-left: -15px;
  border: 12px solid transparent;
  border-top: 12px solid #fff;
  z-index: 2;
}

.name:after {
  content: "";
  position: absolute;
  bottom: -30px;
  left: 50%;
  margin-left: -17px;
  border: 14px solid transparent;
  border-top: 14px solid #555;
  z-index: 1;
}

.name p {
  margin: 0;
  padding: 0;
}

.bar-graph-wrap {
  position: relative;
  overflow: hidden;
  border: #555 solid 2px;
  height: 50px;
  background: white;
}

.bar-graph-wrap .graph {
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    45deg,
    #fec72e 0,
    #fec72e 2px,
    #ffe9a7 0,
    #ffe9a7 50%
  );
  height: 50px;
  position: absolute;
  left: 0;
  border-radius: 0 4px 4px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 10px;
  -webkit-animation: graphAnim 2.5s forwards;
  animation: graphAnim 2.5s forwards;
}

@media screen and (max-width: 750px) {
  .bar-graph-wrap .graph span {
    font-size: 12px;
  }
}

@-webkit-keyframes graphAnim {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes graphAnim {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
</style>
