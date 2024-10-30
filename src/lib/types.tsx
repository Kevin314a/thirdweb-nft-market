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
  traits?: PosseTrait[];
  listedId?: string;
  owner: string;
};

export interface PosseViewNFT extends Omit<PosseFormNFT, 'collection'> {
  contract: PosseViewContract,
  contractAddr: string;
}

export type PosseMarketHistory = {
  seller: string;
  buyer: string;
  action: "DIRECT-LIST" | "ENGLISH-AUCTION";
  orginPrice: string;
  nativePrice: number;
  qty: number;
  purchasedAt: string;
};

export interface PosseDBNFT extends Omit<PosseViewNFT, 'contract'>, Document {
  contract: mongoose.Schema.Types.ObjectId;
  history?: PosseMarketHistory[];
};

export type PosseFormContract = {
  type: "ERC-721" | "ERC-1155",
  address: string;
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  royaltyBps?: string;
  owner: string;
  traitTypes?: string[];
};

export interface PosseViewContract extends PosseFormContract {

};

export interface PosseDBContract extends PosseViewContract, Document {
};


export type ListBalance = {
  value: string;
  decimals: number;
  displayValue: string;
  symbol: string;
  name: string;
};


// in fact, under out rules, PosseFormMarket is almost equal to PosseViewMarket,
// but this data isn't from user's interface, it comes from thirdweb-api. so bigint, and other types are exist
export type PosseFormMarket = {
  //common
  mid: string;
  creatorAddress: string;
  assetContractAddress: string;
  tokenId: string;
  quantity: string;
  currencyContractAddress: string;
  startTimeInSeconds: string;
  endTimeInSeconds: string;
  asset?: PosseViewNFT;
  status: "UNSET" | "CREATED" | "COMPLETED" | "CANCELLED" | "ACTIVE" | "EXPIRED";
  type: "direct-listing" | "english-auction";
  //direct-listing
  currencyValuePerToken?: ListBalance;
  pricePerToken?: string;
  isReservedListing?: boolean;
  //english-auction
  minimumBidAmount?: string;
  minimumBidCurrencyValue?: ListBalance;
  buyoutBidAmount?: string;
  buyoutCurrencyValue?: ListBalance;
  timeBufferInSeconds?: string;
  bidBufferBps?: string;
};

export interface PosseViewMarket extends Omit<PosseFormMarket, 'asset'> {
  asset: PosseViewNFT;
};

export interface PosseDBMarket extends Omit<PosseViewMarket, 'asset'>, Document {
  asset: mongoose.Schema.Types.ObjectId;
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

export type PosseFormDrop = {
  group: "limited" | "unlimited";
  address: string;
  name: string;
  description?: string;
  image?: string;
  payToken: string[];
  numberOfItems?: number;
  mintStartAt: string;
  owner: string;
  mintStages: PosseDropMintStage[];
};

export interface PosseViewDrop extends PosseFormDrop {

};

export interface PosseDBDrop extends Omit<PosseViewDrop, 'mintStartAt'>, Document {
  mintStartAt: Date;
};

export type PosseDropMintStage = {
  name: string;
  price: string;
  currency: string;
  durationd: string;
  durationh: string;
  durationm: string;
  perlimit?: string;
  allows: { address: string }[];
};