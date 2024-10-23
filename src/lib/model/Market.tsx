import { PosseDBMarket } from "../types";
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema<PosseDBMarket>({

  id: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
    required: true,
  },
  creatorAddress: {
    type: String,
    required: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  assetContractAddress: {
    type: String,
    required: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  tokenId: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
    required: true,
  },
  quantity: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
    required: true,
  },
  currencyContractAddress: {
    type: String,
    required: true,
    maxlength: [255, "Name cannot be more than 255 characters"],
  },
  startTimeInSeconds: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
    required: true,
  },
  endTimeInSeconds: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
    required: true,
  },
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT', required: true },
  status: {
    type: String,
    enum: ["UNSET", "CREATED", "COMPLETED", "CANCELLED", "ACTIVE", "EXPIRED"],
    required: true,
  },
  type: {
    type: String,
    enum: ["direct-listing", "english-auction"],
    required: true,
  },
  //direct-listing
  currencyValuePerToken: {
    value: {
      type: Decimal128, get: (v: Decimal128) => BigInt(v.toString()),
      set: (v: bigint) => Decimal128.fromString(v.toString()),
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  pricePerToken: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  isReservedListing: {
    type: Boolean,
  },
  //english-auction
  minimumBidAmount: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  minimumBidCurrencyValue: {
    value: {
      type: Decimal128, get: (v: Decimal128) => BigInt(v.toString()),
      set: (v: bigint) => Decimal128.fromString(v.toString()),
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  buyoutBidAmount: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  buyoutCurrencyValue: {
    value: {
      type: Decimal128, get: (v: Decimal128) => BigInt(v.toString()),
      set: (v: bigint) => Decimal128.fromString(v.toString()),
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  timeBufferInSeconds: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
  bidBufferBps: {
    type: Decimal128,
    get: (v: Decimal128) => BigInt(v.toString()),
    set: (v: bigint) => Decimal128.fromString(v.toString()),
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  strict: false,
});

export default mongoose.models.Market || mongoose.model<PosseDBMarket>("Market", MarketSchema, "markets");
