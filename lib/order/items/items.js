const orderItemSchema = require('../../../model/orderItems');
const { http_response } = require('../../../config/http_responses');

class OrderItem{
  async get_all() {
    try {
      const orderItems = await orderItemSchema.find().lean(true);
      return http_response(200, 'Order item info', {orderItems});
    } catch (error) {
      return http_response(500, 'Internal error in getAll orderItems', {error: true});
    }
  }

  async create(body){
    try {
      const orderItemCreate = new orderItemSchema(body);
      const orderItemSaved = await orderItemCreate.save();
      return http_response(200, 'Order item created successfully', {orderItem: orderItemSaved});
    } catch (error) {
      return http_response(500, 'Internal error in create orderItems', {error: true});
    }
  }

  async update(id, body){
    try {
      body.active = true;
      body.lastModificatedAt = new Date();
      const orderItemUpdated = await orderItemSchema.findByIdAndUpdate(id, body, {new: true}).lean(true);
      return http_response(200, `Order service ${orderItemUpdated.name} was updated successfully`, {orderItem: orderItemUpdated});
    } catch (error) {
      return http_response(500, 'Internal error in update orderItems', {error: true});
    }
  }

  async delete(id){
    try {
      const orderItemUpdated = await orderItemSchema.findByIdAndUpdate(id, {
        active: false, lastModificatedAt: new Date()
      }, {new: true}).lean(true);
      return http_response(200, `Order service ${orderItemUpdated.name} was deleted successfully`, {orderItem: orderItemUpdated});
    } catch (error) {
      return http_response(500, 'Internal error in delete orderItems', {error: true});
    }
  }
}

module.exports = OrderItem;