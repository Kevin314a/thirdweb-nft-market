import { PosseDBLazyNFT } from "../types";
import mongoose from "mongoose";

const LazyNFTSchema = new mongoose.Schema<PosseDBLazyNFT>({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Drop', required: true },
  contractAddr: {
    type: String,
    required: true
  },
  tokenId: {
    type: String,
    required: true,
  },
  category: {
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
  traits: {
    type: [{
      type: { type: String },
      name: { type: String },
    }],
    default: [],
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: true,
});

export default mongoose.models.LazyNFT || mongoose.model<PosseDBLazyNFT>("LazyNFT", LazyNFTSchema, "lazynfts");
