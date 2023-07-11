import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { MetaMaskWallet } from "@thirdweb-dev/wallets";
import { Chain } from "@thirdweb-dev/chains";
import { NFT } from "@thirdweb-dev/sdk";
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

/**
 * WalletConnectからコントラクトを取得する
 * コントラクトに対してTransactionを送信するために必要
 */
async function getContractFromWalletConnect() {
  const wallet = new MetaMaskWallet({});
  const sdk = await ThirdwebSDK.fromWallet(wallet, OASYS_TESTNET_THIRD_WEB);
  const runtimeConfig = useRuntimeConfig();
  return await sdk.getContract(
    runtimeConfig.public.pictureShiritoriCompleteNFTContractAddress
  );
}

/**
 * NFTを発行する
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
  const contract = await getContractFromWalletConnect();
  const tx = await contract.erc721.lazyMint([
    {
      name: passPhrase,
      description: description,
      image: imageUrl,
    },
  ]);
  const tokenData = await tx[0].data(); // (optional) fetch details of the first created NFT

  console.log("tokenId", tokenData, tx);
  const tx_2 = await contract.erc721.claim(1);
  return tokenData;
}

async function getContract() {
  const sdk = new ThirdwebSDK(OASYS_TESTNET_THIRD_WEB);

  const runtimeConfig = useRuntimeConfig();
  return await sdk.getContract(
    runtimeConfig.public.pictureShiritoriCompleteNFTContractAddress
  );
}

/**
 * ウォレットに紐づくNFTを取得する
 */
export async function getMyNFTs(walletAddress: string): Promise<NFT[]> {
  const contract = await getContract();
  const nfts = await contract.erc721.getOwned(walletAddress);
  // 新しいものから先にする
  return nfts.reverse();
}
