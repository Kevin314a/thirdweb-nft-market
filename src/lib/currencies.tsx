import { NATIVE_TOKEN_ADDRESS, type Chain } from "thirdweb";
import { PosseCurrency } from "./types";

export const SUPPORTED_CURRENCIES: PosseCurrency[] = [
  {
    address: NATIVE_TOKEN_ADDRESS,
    symbol: "ETH",
    icon: "/currency/minato-eth.png",
  },
  {
    address: "0x26e6f7c7047252DdE3dcBF26AA492e6a264Db655",
    symbol: "ASTR",
    icon: "/currency/astr.png",
  },
];
