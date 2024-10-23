import { PosseDBNFT } from "../types";
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema<PosseDBNFT>({
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  tokenId: {
    type: Decimal128,
    required: true,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  type: {
    type: String,
    enum: ["ERC-721", "ERC-1155"],
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name for this NFT."],
    maxlength: [255, "Name cannot be more than 255 characters"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  supply: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  externalLink: {
    type: String,
  },
  traits: {
    type: [{
      type: { type: String },
      name: { type: String },
    }],
    default: [],
  },
  isListed: { type: Boolean, default: false },
  owner: {
    type: String,
    required: true,
  },
  history: {
    type: [{
      seller: { type: String },
      buyer: { type: String },
      action: { type: String, enum: ["DIRECT-LIST", "ENGLISH-AUCTION"] },
      orginPrice: {
        type: Decimal128,
        get: (v: Decimal128) => BigInt(v.toString()),
        set: (v: bigint) => Decimal128.fromString(v.toString()),
      },
      nativePrice: { type: Number },
      qty: { type: Number },
      purchasedAt: {
        type: Decimal128,
        get: (v: Decimal128) => BigInt(v.toString()),
        set: (v: bigint) => Decimal128.fromString(v.toString()),
      },
    }],
    default: [],
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: true,
});

export default mongoose.models.NFT || mongoose.model<PosseDBNFT>("NFT", NFTSchema, "nfts");
