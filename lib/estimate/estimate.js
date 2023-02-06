const EstimateSchema = require('../../model/estimate');
const {http_response} = require('../../config/http_responses/index');
const {get_client_and_order_info, complete_ep_info} = require('./functions');

class User {
  constructor(){};

  async get_all_estimates(){
    try {
      const array_of_estimated_prices = await EstimateSchema.find().lean(true);
      const estimed_prices_with_info = await complete_ep_info(array_of_estimated_prices);
      return http_response(200, 'Estimated price info', {estimated_prices: estimed_prices_with_info});
    } catch (error) {
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };

  async get_estimate_by_id(id){
    try {
      const estimated_price = await EstimateSchema.findById(id).lean(true);
      const ep_with_all_info = await get_client_and_order_info(estimated_price);
      return http_response(200, 'Estimated price info', {estimated_price: ep_with_all_info});
    } catch (error) {
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };

  async create(body, clientId, orderId){
    try {
      const estimated_price = new EstimateSchema({...body, clientId, orderId});
      const estimated_price_saved = await estimated_price.save();
      return http_response(201, 'Estimated price created', {estimated_price: estimated_price_saved});
    } catch (error) {
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };

  async edit(body, id){
    try {
      body.lastModificatedAt = new Date();
      body.deleted = false;
      const estimated_price_updated = await EstimateSchema.findByIdAndUpdate(id, body, {new: true});
      return http_response(200, `User updated`, {estimated_price: estimated_price_updated});
    } catch (error) {
      return http_response(500, 'Internal server error in user', {error});
    }
  };

  async delete(id){
    try {
      const estimated_price_deleted = await EstimateSchema.findByIdAndUpdate(
        id,
        {lastModificatedAt: new Date(), deleted: true},
        {new: true}
      );
      return http_response(200, `Estimated price deleted`, {estimated_price: estimated_price_deleted});
    } catch (error) {
      return http_response(500, 'Internal server error in estimated price', {error});
    }
  };
};

module.exports = User;