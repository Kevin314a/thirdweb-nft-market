import { createThirdwebClient, getContract } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";

export const platformFeeDecimal = 0.01;
export const orderNumberPrefix = 100;

export const client = createThirdwebClient({
	clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID as string,
});

export const MARKETPLACE_CONTRACT = getContract({
	address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as string,
	client,
	chain: soneiumMinato,
});

export const SONEIUM_MINATO_API_URL = "https://explorer-testnet.soneium.org/api/v2";
export const SONEIUM_MINATO_DETAIL_URL = "https://explorer-testnet.soneium.org/address";

export const ITEMS_PER_PAGE = 20;