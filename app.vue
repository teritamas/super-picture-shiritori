<template>
  <NuxtPage />
  <bg-plane />
  <div class="frame"></div>
  <AppFooter />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Zen+Antique+Soft&display=swap");
html,
body {
  font-family: "Zen Antique Soft", serif;
  background-color: #85b9dd;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

* {
  position: relative;
}

.frame {
  width: 500px;
  height: auto;
  margin: 15% auto 0;
  position: absolute;
  width: 100%;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
