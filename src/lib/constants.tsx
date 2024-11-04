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

export const DEFAULT_PLATFORMFEE_RECEIVER = process.env.NEXT_PUBLIC_PLATFORM;
export const DEFAULT_PLATFORMFEE_COLLECTION = 2000n;				// 2%  in collection for collect NFTs
export const DEFAULT_PLATFORMFEE_DROP = 10000n;							// 10% in drop

export const DEFAULT_ROYALTYFEE = 2000n;										// 5%  royalty fee

export const END_EARTH_DATE = 10413792000000;
