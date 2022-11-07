const {Schema, model} = require('mongoose');

const EstimateSchema = new Schema({
  order_id: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  golden_price: {
    type: Number,
    default: 0,
  },
  silver_price: {
    type: Number,
    default: 0,
  },
  platinum_price: {
    type: Number,
    default: 0,
  },
  cad_price: {
    type: Number,
    default: 0,
  },
  wax_price: {
    type: Number,
    default: 0,
  },
  wax_quantity: {
    type: Number,
    default: 1,
  },
  casting_price: {
    type: Number,
    default: 0,
  },
  casting_quantity: {
    type: Number,
    default: 1,
  },
  metal_type: {
    type: String,
    required: true,
  },
  metal_quantity: {
    type: Number,
    default: 0,
  },
  stone_quantity: {
    type: Number,
    default: 0,
  },
  stone_price: {
    type: Number,
    default: 0,
  },
  center_stone_price: {
    type: Number,
    default: 0,
  },
  diamond_weight: {
    type: Number,
    default: 0,
  },
  diamond_price: {
    type: Number,
    default: 0,
  },
  color_stone: {
    type: Number,
    default: 0,
  },
  cleaning_price: {
    type: Number,
    default: 0,
  },
  cleaning_quantity: {
    type: Number,
    default: 1,
  },
  polishing_price: {
    type: Number,
    default: 0,
  },
  polishing_quantity: {
    type: Number,
    default: 1,
  },
  assembling_price: {
    type: Number,
    default: 0,
  },
  assembling_quantity: {
    type: Number,
    default: 1,
  },
  findings_price: {
    type: Number,
    default: 0,
  },
  findings_quantity: {
    type: Number,
    default: 1,
  },
  rhodioum_price: {
    type: Number,
    default: 0,
  },
  rhodioum_quantity: {
    type: Number,
    default: 1,
  },
  engraving_price: {
    type: Number,
    default: 0,
  },
  engraving_quantity: {
    type: Number,
    default: 1,
  },
  picture_price: {
    type: Number,
    default: 1,
  },
  total_price: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  last_modificated_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model('estimated_prices', EstimateSchema);