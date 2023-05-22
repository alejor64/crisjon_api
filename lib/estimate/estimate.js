const EstimateSchema = require('../../model/estimate');
const {http_response} = require('../../config/http_responses/index');
const {get_client_and_order_info, complete_ep_info} = require('./functions');

class Estimate {
  constructor(){};

  async get_all_estimates(){
    try {
      const estimatedPrices = await EstimateSchema.find().lean(true);
      return http_response(200, 'Estimated price info', {estimatedPrices});
    } catch (error) {
      console.log('Error in get_all_estimates', error)
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };

  async get_estimate_by_id(id){
    try {
      const estimatedPrice = await EstimateSchema.findById(id).lean(true);
      return http_response(200, 'Estimated price info', {estimatedPrice});
    } catch (error) {
      console.log('Error in get_estimate_by_id', error)
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };

  async create(body){
    try {
      const estimatedPrice = new EstimateSchema({...body});
      const estimatedPriceSaved = await estimatedPrice.save();
      return http_response(201, `Estimated price ${estimatedPrice.name} was created succesfully`, {estimatedPrice: estimatedPriceSaved});
    } catch (error) {
      console.log('Error in create estimate', error)
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };

  async edit(body, id){
    try {
      body.lastModificatedAt = new Date();
      body.deleted = false;
      const estimatedPriceUpdated = await EstimateSchema.findByIdAndUpdate(id, body, {new: true});
      return http_response(200, `Estimate price ${estimatedPriceUpdated.name} was updated succesfully`, {estimatedPrice: estimatedPriceUpdated});
    } catch (error) {
      console.log('Error in edit', error)
      return http_response(500, 'Internal server error in estimate', {error});
    }
  };

  async delete(id){
    try {
      const estimatedPriceDeleted = await EstimateSchema.findByIdAndDelete(id);
      return http_response(200, `Estimated price deleted`, {estimatedPrice: estimatedPriceDeleted});
    } catch (error) {
      console.log('Error in delete', error)
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };
};

module.exports = Estimate;