import { PosseDBMarket } from "../types";
import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema<PosseDBMarket>({

  id: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
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
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
    required: true,
  },
  quantity: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
    required: true,
  },
  currencyContractAddress: {
    type: String,
    required: true,
    maxlength: [255, "Name cannot be more than 255 characters"],
  },
  startTimeInSeconds: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
    required: true,
  },
  endTimeInSeconds: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
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
      type: String,
      get: (v: any): bigint => {
        try {
          return BigInt(v);
        } catch (err) {
          return BigInt(0);
        }
      },
      set: (v: bigint): string => v.toString(),
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  pricePerToken: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
  },
  isReservedListing: {
    type: Boolean,
  },
  //english-auction
  minimumBidAmount: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
  },
  minimumBidCurrencyValue: {
    value: {
      type: String,
      get: (v: any): bigint => {
        try {
          return BigInt(v);
        } catch (err) {
          return BigInt(0);
        }
      },
      set: (v: bigint): string => v.toString(),
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  buyoutBidAmount: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
  },
  buyoutCurrencyValue: {
    value: {
      type: String,
      get: (v: any): bigint => {
        try {
          return BigInt(v);
        } catch (err) {
          return BigInt(0);
        }
      },
      set: (v: bigint): string => v.toString(),
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  timeBufferInSeconds: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
  },
  bidBufferBps: {
    type: String,
    get: (v: any): bigint => {
      try {
        return BigInt(v);
      } catch (err) {
        return BigInt(0);
      }
    },
    set: (v: bigint): string => v.toString(),
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  strict: false,
  timestamps: true,
});

export default mongoose.models.Market || mongoose.model<PosseDBMarket>("Market", MarketSchema, "markets");
