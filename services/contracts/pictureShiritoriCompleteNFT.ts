import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { Chain } from "@thirdweb-dev/chains";
const OASYS_TESTNET_THIRD_WEB = {
  name: "Testnet Hub Layer",
  chain: "Oasys",
  rpc: ["https://rpc.testnet.oasys.games"],
  faucets: ["https://faucet.testnet.oasys.games/"],
  nativeCurrency: {
    name: "Oasys",
    symbol: "OAS",
    decimals: 18,
  },
  shortName: "oas",
  chainId: 9372,
  slug: "oasys-testnet",
  testnet: true,
} as Chain;

let contract: any;
import { MetaMaskWallet } from "@thirdweb-dev/wallets";

export async function getContractFromWalletConnect() {
  const wallet = new MetaMaskWallet({});
  const sdk = await ThirdwebSDK.fromWallet(wallet, OASYS_TESTNET_THIRD_WEB);
  const runtimeConfig = useRuntimeConfig();
  const pictureShiritoriCompleteNFTContractAddress =
    runtimeConfig.public.pictureShiritoriCompleteNFTContractAddress;
  contract = await sdk.getContract(pictureShiritoriCompleteNFTContractAddress);
}

/**
 * NFTを発行するs
 * @param passPhrase しりとりルームの合言葉
 * @param image
 * @param description しりとりルームの説明
 * @returns tokenId トークンID
 */
export async function mint(
  passPhrase: string,
  imageUrl: string,
  description: string = ""
): Promise<any> {
  await getContractFromWalletConnect();
  const tx = await contract.erc721.lazyMint([
    {
      name: passPhrase,
      description: description,
      image: imageUrl,
    },
  ]);
  const tokenData = await tx[0].data(); // (optional) fetch details of the first created NFT

  console.log("tokenId", tokenData, tx);

  return tokenData;
}
