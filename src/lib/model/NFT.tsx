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
      type: { type: String, required: true },
      name: { type: String, required: true },
    }],
  },
  owner: {
    type: String,
    required: true,
  },
  history: {
    type: [{
      seller: { type: String, required: true },
      buyer: { type: String, required: true },
      action: { type: String, enum: ["DIRECT-LIST", "ENGLISH-AUCTION"], required: true },
      orginPrice: {
        type: Decimal128,
        get: (v: Decimal128) => BigInt(v.toString()),
        set: (v: bigint) => Decimal128.fromString(v.toString()),
      },
      nativePrice: { type: Number, required: true },
      qty: { type: Number, required: true },
      purchasedAt: {
        type: Decimal128,
        get: (v: Decimal128) => BigInt(v.toString()),
        set: (v: bigint) => Decimal128.fromString(v.toString()),
      },
    }]
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
});

export default mongoose.models.NFT || mongoose.model<PosseDBNFT>("NFT", NFTSchema, "nfts");
