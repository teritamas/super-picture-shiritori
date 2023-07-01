<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>絵</div>
    <DrawTool :roomId="roomId" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const roomId = route.params.roomId as string;
</script>
