import mongoose, { Document } from "mongoose";

export type PosseTrait = {
  type: string;
  name: string;
};

export type PosseFormNFT = {
  collection: string;
  tokenId: string;
  category: "ERC-721" | "ERC-1155";
  name: string;
  description?: string;
  image?: string;
  supply?: string;
  traits?: PosseTrait[];
  listedId?: string;
  owner: string;
};

export type PosseMarketHistory = {
  seller: string;
  buyer: string;
  action: "DIRECT-LIST" | "ENGLISH-AUCTION";
  orginPrice: string;
  nativePrice: number;
  qty: number;                            // bigint?
  purchasedAt: number;
};

export interface PosseBridgeNFT extends Omit<PosseFormNFT, 'collection'> {
  contract?: PosseBridgeContract,         // up to down
  contractAddr: string;
  history?: PosseMarketHistory[];         // up to down
};

export interface PosseDBNFT extends Omit<PosseBridgeNFT, 'contract'>, Document {
  contract: mongoose.Schema.Types.ObjectId;
};

export type PosseFormContract = {
  category: "ERC-721" | "ERC-1155",
  address: string;
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  royaltyBps?: string;
  owner: string;
  traitTypes?: string[];                  // TODO term `traitTypes` is incorrect
};

export interface PosseBridgeContract extends PosseFormContract {
};

export interface PosseDBContract extends PosseBridgeContract, Document {
};

export type ListBalance = {
  value: string;
  decimals: number;
  displayValue: string;
  symbol: string;
  name: string;
};

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
  asset?: PosseBridgeNFT;
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

export interface PosseBridgeMarket extends Omit<PosseFormMarket, 'asset'> {
  asset: PosseBridgeNFT;
};

export interface PosseDBMarket extends Omit<PosseBridgeMarket, 'asset'>, Document {
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
  group: "LIMITED" | "UNLIMITED";
  address: string;
  name: string;
  description?: string;
  image?: string;
  payToken: string[];
  numberOfItems?: string;
  mintStartAt: number;
  owner: string;
  visible?: boolean;
  mintStages: PosseFormDropMintStage[];
};

export interface PosseBridgeDrop extends Omit<PosseFormDrop, 'mintStages'> {
  mintStages: PosseBridgeDropMintStage[];
};

export interface PosseDBDrop extends PosseBridgeDrop, Document {
};

export type PosseFormDropMintStage = {
  name: string;
  price: string;
  currency: string;
  durationd: string;
  durationh: string;
  durationm: string;
  perlimit?: string;
  allows: { address: string }[];
};

export interface PosseBridgeDropMintStage extends Omit<PosseFormDropMintStage, 'durationd' | 'durationh' | 'durationm' | 'allows'> {
  duration: number;
  allows: string[];
};

export type PosseFormLazyNFT = {
  collection: string;
  tokenId: string;
  category: "ERC-721" | "ERC-1155";
  name: string;
  description?: string;
  image: string;
  traits: PosseTrait[];
};

export interface PosseBridgeLazyNFT extends Omit<PosseFormLazyNFT, 'collection'> {
  contract?: PosseBridgeDrop,         // up to down
  contractAddr: string;
};

export interface PosseDBLazyNFT extends Omit<PosseBridgeLazyNFT, 'contract'>, Document {
  contract: mongoose.Schema.Types.ObjectId;
};

export type PosseFormShareMetadata = {
  category: "ERC-721" | "ERC-1155";
  name: string;
  description?: string;
  image: string;
};