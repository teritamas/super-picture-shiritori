<template>
  <div class="text-center">
    <div class="speech-balloon-right">
      <label for="chainCount">{{ label }}</label>
    </div>
    <input
      class="d-input bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      style="border: 2px solid #000"
      type="text"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target?.value)"
      :placeholder="placeholder"
    />
    <small v-if="informationMessage" class="block">{{
      informationMessage
    }}</small>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  inputValue: {
    type: Object as PropType<string | number>,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  informationMessage: {
    type: String,
    required: false,
  },
});

defineEmits(["update:inputValue"]);
</script>

<style>
.d-input {
  width: 200px;
  display: inline;
}

.speech-balloon-right {
  position: relative;
  display: inline-block;
  margin: 1em 15px 0 0;
  padding: 7px 10px;
  min-width: 100px;
  max-width: 100%;
  font-size: 14px;
  background: #fff;
  border: solid 3px #555;
  box-sizing: border-box;
  text-align: center;
}

.speech-balloon-right:before {
  content: "";
  position: absolute;
  top: 50%;
  right: -24px;
  margin-top: -12px;
  border: 12px solid transparent;
  border-left: 13px solid #fff;
  z-index: 2;
}

.speech-balloon-right:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -30px;
  margin-top: -14px;
  border: 14px solid transparent;
  border-left: 14px solid #555;
  z-index: 1;
}
</style>
