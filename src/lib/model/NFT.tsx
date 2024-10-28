import { PosseDBNFT } from "../types";
import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema<PosseDBNFT>({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  contractAddr: {
    type: String,
    required: true
  },
  tokenId: {
    type: String,
    required: true,
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
    type: String,
  },
  traits: {
    type: [{
      type: { type: String },
      name: { type: String },
    }],
    default: [],
  },
  listedId: {
    type: String,
  },
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
        type: String,
      },
      nativePrice: { type: Number },
      qty: { type: Number },
      currency: { type: String },
      netName: { type: String },
      purchasedAt: {
        type: Date,
        default: Date.now,
        get: (v: Date) => v ? v.toISOString() : '',
        set: (v: string) => new Date(v),
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
