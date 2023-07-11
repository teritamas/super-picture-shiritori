<template>
  <nav class="bg-nav border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"
    >
      <a href="/" class="flex items-center">
        <span
          class="title self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >超絵しりとり</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="bg-gray-700 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:ring-2 text-gray-400 hover:bg-gray-500 ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="bg-nav-btn font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <w3m-core-button themeVariables="--w3m-accent-color: #000" />
          </li>
          <li class="mt-3 md:mt-0">
            <w3m-network-switch themeVariables="--w3m-accent-color: #000" />
          </li>
          <li class="mt-3 md:mt-0">
            <nuxt-link
              to="/myNftLists"
              type="button"
              class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              発行したNFTを確認する
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap");

:root {
  --w3m-accent-color: #333 !important;
}

.title {
  font-size: 1.5rem;
  text-align: center;
  color: lavenderblush;
  font-family: "Mochiy Pop P One", sans-serif;
  color: #140920;
}

.w3m-core-button {
  background: black;
}

.bg-nav-btn {
  background: transparent;
  border: transparent solid;
}

.bg-nav {
  border-bottom: 3px solid #000;
}
</style>
