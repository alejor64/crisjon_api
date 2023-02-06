const {Schema, model} = require('mongoose');

const EstimateSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  clientId: {
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
    required: true,
  },
  metalQuantity: {
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
  diamondWeight: {
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
  totalPrice: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastModificatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model('estimated_prices', EstimateSchema);