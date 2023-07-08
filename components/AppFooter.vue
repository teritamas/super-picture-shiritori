<template>
  <div class="flex justify-end space-x-3">
    <w3m-core-button></w3m-core-button>
    <w3m-network-switch></w3m-network-switch>
  </div>
</template>

<script setup lang="ts">
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import { configureChains, createConfig } from "@wagmi/core";
import { OASYS_TESTNET } from "../constants/client/chains";
const chains = [OASYS_TESTNET];

const runtimeConfig = useRuntimeConfig();
const projectId = runtimeConfig.public.walletConnectProjectId;
if (!projectId || projectId === "") {
  // WalletConnectのプロジェクトIDが設定されていない場合はエラーを投げる
  throw new Error("walletConnectProjectId is not defined");
}

/**
 * Oasysに接続するためにWeb3Modalを初期化する
 */
const initWeb3Client = async () => {
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  const web3modal = new Web3Modal({ projectId }, ethereumClient);
};
onMounted(() => {
  initWeb3Client();
});
</script>
