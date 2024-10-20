import { Address, NFT } from "thirdweb";

export type PossePreNFT = Omit<
  NFT,
  | "id"
> & {
  collection: string;
};

export type PosseDBNFT = {
  collection: string;
  name: string;
  supply?: string;
  image?: string;
  description?: string;
  externalLink?: string;
  traits?: PosseTrait[];
  owner: string;
  type?: "ERC-721" | "ERC-1155",
  tokenId?: string;
};

export type PossePreContract = {
  type: "ERC-721" | "ERC-1155",
  address: string;
  name: string;
  description?: string;
  image?: string;
  external_link?: string;
  social_urls?: Record<string, string>;
  symbol?: string;
  contractURI?: string;
  defaultAdmin?: string;
  saleRecipient?: string;
  platformFeeBps?: bigint;
  platformFeeRecipient?: string;
  royaltyRecipient?: string;
  royaltyBps?: bigint;
  trustedForwarders?: string[];
};

export type PosseDBContract = {
  address?: string;
  type: "ERC-721" | "ERC-1155",
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  platformFeeBps?: string;
  royaltyBps?: string;
  owner: string;
  traitTypes: string[];
}

export type PosseTrait = {
  type: string;
  name: string;
};
