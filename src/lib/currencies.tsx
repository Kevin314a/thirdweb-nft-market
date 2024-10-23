import type { Chain } from "thirdweb";
import { PosseCurrency } from "./types";

export const SUPPORTED_CURRENCIES: PosseCurrency[] = [
  {
    address: "0x26e6f7c7047252DdE3dcBF26AA492e6a264Db655",
    symbol: "ASTR",
    icon: "/currency/astr.png",
  },
];

export const NATIVE_TOKEN_ICON_MAP: { [key in Chain["id"]]: string } = {
  1946: "/currency/minato-eth.png",
};
