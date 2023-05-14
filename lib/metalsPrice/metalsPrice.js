const axios = require('axios');
const MetalsPriceSchema = require('../../model/metalsPrice');
const { http_response } = require('../../config/http_responses/index');
const { metal_price_api_key } = require('../../config/index');
const { METAL_API_BASE, METAL_API_CURRENCIES } = require('../../utils/constants/index');
const { updateMetalPrice } = require('./functions');

class MetalsPrice {
  constructor () {};

  async getAllMetalsPrice() {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.metalpriceapi.com/v1/latest?api_key=${metal_price_api_key}&base=${METAL_API_BASE}&currencies=${METAL_API_CURRENCIES}`,
        headers: {}
      };
      const response = await axios.request(config);
      const { rates } = await response.data;
      await updateMetalPrice(rates);
      return http_response(200, 'Metal price updated successfully', {ok: true})
    } catch (error) {
      console.log('Error in getAllMetalsPrice', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async getMetalsPrice() {
    try {
      const metals = await MetalsPriceSchema.find().lean(true);
      return http_response(200, 'Orders info', {metals});
    } catch (error) {
      console.log('Error in getMetalsPrice', error)
      return http_response(500, 'Internal server error', {error});
    }
  };

  async createMetalPrice({symbol, name}) {
    try {
      const newMetal = new MetalsPriceSchema({symbol, name});
      const metalSaved = await newMetal.save();
      return http_response(200, 'Metal created successfully', {metalSaved});
    } catch (error) {
      console.log('Error in createMetalPrice', error);
      return http_response(500, 'Internal server error', {error});
    }
  }
};

module.exports = MetalsPrice;