import { PosseDBContract } from "../types";
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema<PosseDBContract>({
  type: {
    type: String,
    enum: ["ERC-721", "ERC-1155"],
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
  // platformFeeBps: {
  //   type: Decimal128,
  //   get: (v: Decimal128) => BigInt(v.toString()),
  //   set: (v: bigint) => Decimal128.fromString(v.toString()),
  // },
  royaltyBps: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  owner: {
    type: String,
    required: true,
  },
  traitTypes: {
    type: [{ type: String, required: true }],
  },
  }, {
    toJSON: { getters: true },
    toObject: { getters: true },
});

export default mongoose.models.Contract || mongoose.model<PosseDBContract>("Contract", ContractSchema, "contracts");
