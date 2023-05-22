const EstimateSchema = require('../../../model/estimate');

const estimate_by_id = async(id = '') => {
  const estimated_price = await EstimateSchema.findById(id);
  if(!estimated_price) throw new Error(`The estimated_price ${id} does not exist`);
};

const metal_price_quantity = async(metalPriceQuantity = 0) => {
  if(!metalPriceQuantity) throw new Error(`Metal price and metal quantity should not be 0`);
};

module.exports = {
  estimate_by_id,
  metal_price_quantity,
};