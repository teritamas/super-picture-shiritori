<template>
  <nuxt-link
    class="block btn-d relative z-10 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
    :to="props.to"
  >
    <span
      class="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
    >
      {{ props.buttonText }}
    </span>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
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
</style>
