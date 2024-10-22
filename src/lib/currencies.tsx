import type { Chain } from "thirdweb";
import { PosseCurrency } from "./types";

export const SUPPORTED_CURRENCIES: PosseCurrency[] = [
  {
    address: "0x551F69102DA8722F3f0240DB1e2872fD7F03F826",
    symbol: "ASTR",
    icon: "/currency/astr.png",
  },
];

export const NATIVE_TOKEN_ICON_MAP: { [key in Chain["id"]]: string } = {
  1946: "/currency/minato-eth.png",
};
