import { PosseDBMarket } from "../types";
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema<PosseDBMarket>({
  mid: {
    type: String,
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
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  currencyContractAddress: {
    type: String,
    required: true,
    maxlength: [255, "Name cannot be more than 255 characters"],
  },
  startTimeInSeconds: {
    type: String,
    required: true,
  },
  endTimeInSeconds: {
    type: String,
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
    value: { type: String },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  pricePerToken: {
    type: String,
  },
  isReservedListing: {
    type: Boolean,
  },
  //english-auction
  minimumBidAmount: {
    type: String,
  },
  minimumBidCurrencyValue: {
    value: {
      type: String,
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  buyoutBidAmount: {
    type: String,
  },
  buyoutCurrencyValue: {
    value: {
      type: String,
    },
    decimals: { type: Number },
    displayValue: { type: String },
    symbol: { type: String },
    name: { type: String },
  },
  timeBufferInSeconds: {
    type: String,
  },
  bidBufferBps: {
    type: String,
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: true,
});

export default mongoose.models.Market || mongoose.model<PosseDBMarket>("Market", MarketSchema, "markets");
