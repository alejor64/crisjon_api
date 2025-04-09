const {Schema, model} = require('mongoose');

const EstimateSchema = new Schema({
  name: {
    type: String,
  },
  clientName: {
    type: String,
    required: true,
  },
  goldenPrice: {
    type: Number,
    default: 0,
  },
  silverPrice: {
    type: Number,
    default: 0,
  },
  platinumPrice: {
    type: Number,
    default: 0,
  },
  cadPrice: {
    type: Number,
    default: 0,
  },
  waxPrice: {
    type: Number,
    default: 0,
  },
  waxQuantity: {
    type: Number,
    default: 1,
  },
  castingPrice: {
    type: Number,
    default: 0,
  },
  castingQuantity: {
    type: Number,
    default: 1,
  },
  metalType: {
    type: String,
  },
  metalPrice: {
    type: Number,
    default: 0,
  },
  metalQuantity: {
    type: Number,
    default: 0,
  },
  metal10Price: {
    type: Number,
    default: 0,
  },
  metal10Quantity: {
    type: Number,
    default: 0,
  },
  metal14Price: {
    type: Number,
    default: 0,
  },
  metal14Quantity: {
    type: Number,
    default: 0,
  },
  metal18Price: {
    type: Number,
    default: 0,
  },
  metal18Quantity: {
    type: Number,
    default: 0,
  },
  metalPlatinumPrice: {
    type: Number,
    default: 0,
  },
  metalPlatinumQuantity: {
    type: Number,
    default: 0,
  },
  metalSilverPrice: {
    type: Number,
    default: 0,
  },
  metalSilverQuantity: {
    type: Number,
    default: 0,
  },
  stoneQuantity: {
    type: Number,
    default: 0,
  },
  stonePrice: {
    type: Number,
    default: 0,
  },
  centerStonePrice: {
    type: Number,
    default: 0,
  },
  diamondQuantity: {
    type: Number,
    default: 0,
  },
  diamondPrice: {
    type: Number,
    default: 0,
  },
  colorStone: {
    type: Number,
    default: 0,
  },
  cleaningPrice: {
    type: Number,
    default: 0,
  },
  cleaningQuantity: {
    type: Number,
    default: 1,
  },
  polishingPrice: {
    type: Number,
    default: 0,
  },
  polishingQuantity: {
    type: Number,
    default: 1,
  },
  assemblingPrice: {
    type: Number,
    default: 0,
  },
  assemblingQuantity: {
    type: Number,
    default: 1,
  },
  findingsPrice: {
    type: Number,
    default: 0,
  },
  findingsQuantity: {
    type: Number,
    default: 1,
  },
  rhodioumPrice: {
    type: Number,
    default: 0,
  },
  rhodioumQuantity:{
    type: Number,
    default: 1,
  },
  engravingPrice: {
    type: Number,
    default: 0,
  },
  engravingQuantity: {
    type: Number,
    default: 1,
  },
  picturePrice: {
    type: Number,
    default: 1,
  },
  pictureQuantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

module.exports = model('estimatedPrices', EstimateSchema);