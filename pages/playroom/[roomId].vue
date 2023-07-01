<template>
  <div class="bg">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <word-chain class="m-5" :roomId="roomId" />
      <DrawTool />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const roomId = route.params.roomId as string;
</script>

<style scoped>
.bg {
  background-image: url(../assets/image/bglist.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
