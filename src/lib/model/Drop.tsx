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
    enum: ["limited", "unlimited"],
    required: true,
  },
  address: {
    type: String,
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
  numberOfItems: { type: Number, default: 0, required: true },
  mintStartAt: {
    type: Date,
    required: true,
  },
  mintStages: {
    type: [{
      name: { type: String },
      price: { type: String },
      currency: { type: String },
      durationd: { type: String },
      durationh: { type: String },
      durationm: { type: String },
      perlimit: { type: String },
      allows: { type: [{ type: String }] },
    }],
    default: [],
  },
  owner: {
    type: String,
    required: true,
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: true,
});


export default mongoose.models.Drop || mongoose.model<PosseDBDrop>("Drop", DropSchema, "drops");
