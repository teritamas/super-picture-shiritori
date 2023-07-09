<template>
  <div class="bg">
    <div class="main">
      <h1 class="title">超絵しりとり</h1>
      <h2 class="sub-title hidden md:block">Super Picture Shiritori</h2>
      <div class="text-center md:mt-8">
        <PrimaryButton
          :buttonText="'ルームを探して遊ぶ'"
          :to="'/playroomList'"
        />
        <SecondaryButton
          :buttonText="'ルームを作成して遊ぶ'"
          :to="'/makePlayroom'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap");

.title {
  position: relative;
  padding: 15px;
  color: #a347ff;
  margin-bottom: 0.2rem;
  padding: 1rem;
  overflow: hidden;
  font-family: impact;
  text-shadow: 0px 0px #272826, 1px 1px #272826, 2px 2px #272826,
    3px 3px #272826, 4px 4px #272826, 5px 5px #272826, 6px 6px #272826,
    7px 7px #272826, 8px 8px #272826, 9px 9px #272826, 10px 10px #272826,
    11px 11px #272826, 12px 12px #272826, 13px 13px #272826, 14px 14px #272826,
    15px 15px #272826, 16px 16px #272826;
  text-align: center;
}

.title {
  font-size: 3rem;
  text-align: center;
  color: lavenderblush;
  font-family: "Mochiy Pop P One", sans-serif;
  position: relative;
  color: #a347ff;
}
.sub-title {
  font-size: 1rem;
  text-align: center;
  color: lavenderblush;
  font-family: "Mochiy Pop P One", sans-serif;
  position: relative;
  color: #a347ff;
}

.bg {
  background-image: url(../assets/image/bg.webp);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
</style>
