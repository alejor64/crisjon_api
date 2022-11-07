const EstimateSchema = require('../../../model/estimate');

const estimate_by_id = async(id = '') => {
  const estimated_price = await EstimateSchema.findById(id);
  if(!estimated_price) throw new Error(`The estimated_price ${id} does not exist`);
};

module.exports = {
  estimate_by_id,
}