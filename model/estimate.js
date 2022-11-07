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