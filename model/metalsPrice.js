const {Schema, model} = require('mongoose');

const MetalsPriceSchema = new Schema({
  symbol: {
    type: String,
    require: true,
  }, 
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

module.exports = model('metalsPrice', MetalsPriceSchema);