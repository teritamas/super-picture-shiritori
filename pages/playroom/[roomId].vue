<template>
  <div>
    <DrawTool :roomId="roomId" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const roomId = route.params.roomId as string;
</script>
