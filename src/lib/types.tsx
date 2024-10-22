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
  externalLink?: string;
  traits?: PosseTrait[];
  owner: string;
};

export interface PosseViewNFT {
  collectionId: PosseFormContract,
  tokenId: string;
  type: "ERC-721" | "ERC-1155";
  name: string;
  description?: string;
  image?: string;
  supply?: string;
  externalLink?: string;
  traits?: PosseTrait[];
  owner: string;
}

export interface PosseDBNFT extends Omit<PosseViewNFT, 'collectionId'>, Document {
  collectionId: mongoose.Schema.Types.ObjectId;
};

export type PosseFormContract = {
  type: "ERC-721" | "ERC-1155",
  address: string;
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  platformFeeBps?: string;
  royaltyBps?: string;
  owner: string;
  traitTypes: string[];
};

export type PosseViewContract = {
  type: "ERC-721" | "ERC-1155",
  address: string;
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  platformFeeBps?: string;
  royaltyBps?: string;
  owner: string;
  traitTypes: string[];
};

export interface PosseDBContract extends PosseViewContract, Document {
};
