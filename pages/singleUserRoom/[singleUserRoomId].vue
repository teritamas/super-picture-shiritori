<template>
  <div class="bg">
    {{ singleUserRoomId }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const singleUserRoomId = route.params.singleUserRoomId as string;
</script>
