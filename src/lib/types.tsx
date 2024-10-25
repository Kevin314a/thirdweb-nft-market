import mongoose, { Document } from "mongoose";

export type PosseTrait = {
  type: string;
  name: string;
};

export type PosseFormNFT = {
  collection: string;
  tokenId: string;
  type: "ERC-721" | "ERC-1155";
  name: string;
  description?: string;
  image?: string;
  supply?: string;
  // externalLink?: string;
  traits?: PosseTrait[];
  isListed?: boolean;
  owner: string;
};

export interface PosseViewNFT {
  contract: PosseViewContract,
  contractAddr: string;
  tokenId: string;
  type: "ERC-721" | "ERC-1155";
  name: string;
  description?: string;
  image?: string;
  supply?: string;
  // externalLink?: string;
  traits?: PosseTrait[];
  isListed?: boolean;
  owner: string;
}

export interface PosseDBNFT extends Omit<PosseViewNFT, 'contract' | 'tokenId' | 'supply'>, Document {
  contract: mongoose.Schema.Types.ObjectId;
  tokenId: bigint;
  supply?: bigint;
  history?: PosseDBMarketHistory[];
};

export type PosseFormContract = {
  type: "ERC-721" | "ERC-1155",
  address: string;
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  // platformFeeBps?: string;
  royaltyBps?: string;
  owner: string;
  traitTypes?: string[];
};

export type PosseViewContract = PosseFormContract & {
  
};

export interface PosseDBContract extends Omit<PosseViewContract, 'royaltyBps' | 'platformFeeBps'>, Document {
  royaltyBps?: bigint;
  // platformFeeBps?: bigint;
};


export type ViewListBalance = {
  value: string;
  decimals: number;
  displayValue: string;
  symbol: string;
  name: string;
};

export type DBListBalance = {
  value: bigint;
  decimals: number;
  displayValue: string;
  symbol: string;
  name: string;
};

export type PosseViewMarket = {
  //common
  id: string;
  creatorAddress: string;
  assetContractAddress: string;
  tokenId: string;
  quantity: string;
  currencyContractAddress: string;
  startTimeInSeconds: string;
  endTimeInSeconds: string;
  asset: PosseViewNFT;
  status: "UNSET" | "CREATED" | "COMPLETED" | "CANCELLED" | "ACTIVE" | "EXPIRED";
  type: "direct-listing" | "english-auction";
  //direct-listing
  currencyValuePerToken?: ViewListBalance;
  pricePerToken?: string;
  isReservedListing?: boolean;
  //english-auction
  minimumBidAmount?: string;
  minimumBidCurrencyValue?: ViewListBalance;
  buyoutBidAmount?: string;
  buyoutCurrencyValue?: ViewListBalance;
  timeBufferInSeconds?: string;
  bidBufferBps?: string;
};

// in fact, under out rules, PosseFormMarket is almost equal to PosseViewMarket,
// but this data isn't from user's interface, it comes from thirdweb-api. so bigint, and other types are exist
export type PosseFormMarket = {
  id: bigint;
  creatorAddress: string;
  assetContractAddress: string;
  tokenId: bigint;
  quantity: bigint;
  currencyContractAddress: string;
  startTimeInSeconds: bigint;
  endTimeInSeconds: bigint;
  asset: string;
  status: "UNSET" | "CREATED" | "COMPLETED" | "CANCELLED" | "ACTIVE" | "EXPIRED";
  type: "direct-listing" | "english-auction";
  //direct-listing
  currencyValuePerToken?: DBListBalance;
  pricePerToken?: bigint;
  isReservedListing?: boolean;
  //english-auction
  minimumBidAmount?: bigint;
  minimumBidCurrencyValue?: DBListBalance;
  buyoutBidAmount?: bigint;
  buyoutCurrencyValue?: DBListBalance;
  timeBufferInSeconds?: bigint;
  bidBufferBps?: bigint;
};

export interface PosseDBMarket extends Omit<PosseViewMarket,
  | 'id'
  | 'tokenId'
  | 'quantity'
  | 'startTimeInSeconds'
  | 'endTimeInSeconds'
  | 'asset'
  | 'pricePerToken'
  | 'minimumBidAmount'
  | 'buyoutBidAmount'
  | 'timeBufferInSeconds'
  | 'bidBufferBps'
  | 'currencyValuePerToken'
  | 'minimumBidCurrencyValue'
  | 'buyoutCurrencyValue'
>, Document {
  id: bigint;
  tokenId: bigint;
  quantity: bigint;
  startTimeInSeconds: bigint;
  endTimeInSeconds: bigint;
  asset: mongoose.Schema.Types.ObjectId;
  //direct-listing
  currencyValuePerToken: DBListBalance;
  pricePerToken: bigint;
  //english-auction
  minimumBidAmount: bigint;
  minimumBidCurrencyValue: DBListBalance;
  buyoutBidAmount: bigint;
  buyoutCurrencyValue: DBListBalance;
  timeBufferInSeconds: bigint;
  bidBufferBps: bigint;
};

export type PosseViewMarketHistory = {
  seller: string;
  buyer: string;
  action: "DIRECT-LIST" | "ENGLISH-AUCTION";
  orginPrice: string;
  nativePrice: number;
  qty: number;
  purchasedAt: string;
};

export type PosseDBMarketHistory = {
  seller: string;
  buyer: string;
  action: "DIRECT-LIST" | "ENGLISH-AUCTION";
  orginPrice: bigint;
  nativePrice: number;
  qty: number;
  purchasedAt: string;
};

export type PosseFormListing = {
  price: string;
  currency: string;
  qty?: string;
};

export type PosseCurrency = {
  address: string;
  symbol: string;
  icon: string;
};