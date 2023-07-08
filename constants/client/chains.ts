import { Chain } from "@wagmi/core";

export const OASYS_TESTNET = {
  id: 9372,
  name: "Testnet Hub Layer",
  network: "testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Oasys",
    symbol: "OAS",
  },
  rpcUrls: {
    public: { http: ["https://rpc.testnet.oasys.games"] },
    default: { http: ["https://rpc.testnet.oasys.games"] },
  },
  blockExplorers: {
    etherscan: { name: "SnowTrace", url: "https://scan.testnet.oasys.games/" },
    default: { name: "SnowTrace", url: "https://scan.testnet.oasys.games/" },
  },
  contracts: {
    // multicall3: {
    //   address: "0xca11bde05977b3631167028862be2a173976ca11",
    //   blockCreated: 11_907_934,
    // },
  },
} as Chain;
