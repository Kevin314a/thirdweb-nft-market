import { PosseDBDrop } from "../types";
import mongoose from "mongoose";

const DropSchema = new mongoose.Schema<PosseDBDrop>({
  // category: {
  //   type: String,
  //   enum: ["ERC-721", "ERC-1155"],
  //   required: true,
  // },
  group: {
    type: String,
    enum: ["LIMITED", "UNLIMITED"],
    required: true,
  },
  address: {
    type: String,
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
  payToken: {
    type: [{ type: String, required: true }],
  },
  mintStages: {
    type: [{
      name: { type: String },
      price: { type: String },
      currency: { type: String },
      numberOfItems: { type: String },
      startAt: { type: Number },
      endAt: { type: Number },
      perlimit: { type: String },
      allows: { type: [{ type: String }] },
    }],
    default: [],
  },
  royaltyBps: {
    type: String,
    default: "0",
  },
  owner: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: true,
});

export default mongoose.models.Drop || mongoose.model<PosseDBDrop>("Drop", DropSchema, "drops");
