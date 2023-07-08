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
} as Chain;
