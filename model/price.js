const {Schema, model} = require('mongoose');

const priceSchema = new Schema({
  order_id: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
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

module.exports = model('prices', priceSchema);