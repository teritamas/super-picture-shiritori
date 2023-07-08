<template>
  <div class="bg">
    <div class="main">
      <h1 class="title">超絵しりとり</h1>
      <h2 class="sub-title hidden md:block">Super Picture Shiritori</h2>
      <div class="text-center md:mt-8">
        <nuxt-link
          class="block btn-d relative z-10 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          to="/playroomList"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            ルームを探して遊ぶ
          </span>
        </nuxt-link>
        <nuxt-link
          class="block btn-c relative z-10 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          to="/makePlayroom"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            ルームを作成して遊ぶ
          </span>
        </nuxt-link>
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
  background-image: url(../assets/image/bg.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

.btn-d {
  padding: 1rem 1rem;
  border: 3px solid #212121;
  border-bottom-width: 8px;
  border-radius: 10px;
  color: #212121;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-image: linear-gradient(135deg, #ffc107 25%, transparent 25%),
    linear-gradient(225deg, #ffc107 25%, transparent 25%),
    linear-gradient(45deg, #ffc107 25%, transparent 25%),
    linear-gradient(315deg, #ffc107 25%, #ffe9a7 25%);
  background-position: 20px 0, 20px 0, 0 0, 0 0;
  background-size: 40px 40px;
  background-repeat: repeat;
  display: block;
  width: 300px;
  margin: 5px auto;
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
  margin: 5px auto;
}
</style>
