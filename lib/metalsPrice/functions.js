const MetalsPriceSchema = require('../../model/metalsPrice');

const updateMetalPrice = async(rates) => {
  for (let metal in rates) {
    try {
      await MetalsPriceSchema.findOneAndUpdate({symbol: metal}, {price: rates[metal]});
    } catch (error) {
      console.log('Error in updateMetalPrice', error)
    }
  }
};

module.exports = {
  updateMetalPrice,
}