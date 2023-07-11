<template>
  <h3 class="font-bold text-center">あいことば: {{ metadata.name }}</h3>
  <div>
    <img
      class="rounded-t-sm m-auto w-64 h-64 object-cover"
      alt="product image"
      :src="metadata.image!"
    />
  </div>
  <div class="p-2">
    <span
      v-for="tag in metadata.tags"
      :key="tag"
      class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
      >{{ tag }}</span
    >
  </div>
  <div class="form-item">
    <p class="form-item-label is-msg">
      <span class="form-item-list"></span>説明
    </p>
    <p style="max-width: 430px">{{ metadata.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { NFT } from "@thirdweb-dev/sdk";

const props = defineProps({
  nft: {
    type: Object as PropType<NFT>,
    required: true,
  },
});
const metadata = ref(props.nft.metadata);
</script>
