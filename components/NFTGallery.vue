<template>
  <div
    v-if="connectWallet()"
    class="p-15 grid grid-cols-1 gap-10 place-items-center"
    style="max-width: 400px; margin: 0 auto"
  >
    <div class="col-span-2 pt-10">
      <h1 class="text-center">あなたのNFTアート</h1>
      <a :href="blockExplorerUrl()">ブロックエクスプローラーで確認</a>
    </div>

    <div class="">
      <div v-for="(nft, index) in nfts" :key="index">
        <NFTGalleryCard v-if="imageNotMissing(nft.metadata.image)" :nft="nft" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMyNFTs } from "../services/contracts/pictureShiritoriCompleteNFT";
import { NFT } from "@thirdweb-dev/sdk";
import { getAccount, GetAccountResult, PublicClient } from "@wagmi/core";

// ウォレットに紐づくNFTを表示する
const nfts = ref([] as NFT[]);
const walletAccount = ref(Object as unknown as GetAccountResult<PublicClient>);
onMounted(async () => {
  walletAccount.value = getAccount();
  if (!connectWallet()) return;
  nfts.value = await getMyNFTs(walletAccount.value.address!);
});
const connectWallet = () => {
  return walletAccount.value.isConnected;
};
// 先頭がhttps://の場合は画像が存在すると判断する
const imageNotMissing = (imageUrl: string | null | undefined) => {
  return imageUrl?.startsWith("https://");
};

// ブロックエクスプローラーのリンクを生成する
const runtimeConfig = useRuntimeConfig();
const blockExplorerUrl = () => {
  return `${runtimeConfig.public.blockExplorerUrl}/${runtimeConfig.public.pictureShiritoriCompleteNFTContractAddress}`;
};
</script>
