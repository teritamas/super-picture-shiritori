// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
      walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID || "",
      pictureShiritoriCompleteNFTContractAddress:
        process.env.PICTURE_SHIRITORI_COMPLETE_NFT_CONTRACT_ADDRESS || "",
    },
  },
  routeRules: {
    "/api/**": {
      cors: true,
      headers: {
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "*",
        "access-control-allow-headers": "*",
      },
    },
  },
});
