import { createThirdwebClient } from "thirdweb";

export const platformFeeDecimal = 0.01;
export const orderNumberPrefix = 100;

export const client = createThirdwebClient({
	clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID as string,
});