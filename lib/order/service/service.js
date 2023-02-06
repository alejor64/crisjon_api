const OrderServiceSchema = require('../../../model/orderService');
const { http_response } = require('../../../config/http_responses');

class OrderService{
  async get_all() {
    try {
      const orderServices = await OrderServiceSchema.find().lean(true);
      return http_response(200, 'Order service info', {orderServices});
    } catch (error) {
      return http_response(500, 'Internal error in getAll orderServices', {error: true});
    }
  }

  async create(body){
    try {
      const orderServiceTCreate = new OrderServiceSchema(body);
      const orderServiceSaved = await orderServiceTCreate.save();
      return http_response(200, 'Order service created successfully', {orderService: orderServiceSaved});
    } catch (error) {
      return http_response(500, 'Internal error in create orderServices', {error: true});
    }
  }

  async update(id, body){
    try {
      body.active = true;
      body.lastModificatedAt = new Date();
      const orderServiceUpdated = await OrderServiceSchema.findByIdAndUpdate(id, body, {new: true}).lean(true);
      return http_response(200, `Order service ${orderServiceUpdated.name} was updated successfully`, {orderService: orderServiceUpdated});
    } catch (error) {
      return http_response(500, 'Internal error in update orderServices', {error: true});
    }
  }

  async delete(id){
    try {
      const orderServiceUpdated = await OrderServiceSchema.findByIdAndUpdate(id, {
        active: false, lastModificatedAt: new Date()
      }, {new: true}).lean(true);
      return http_response(200, `Order service ${orderServiceUpdated.name} was deleted successfully`, {orderService: orderServiceUpdated});
    } catch (error) {
      return http_response(500, 'Internal error in delete orderServices', {error: true});
    }
  }
}

module.exports = OrderService;