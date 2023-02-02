const OrderSchema = require('../../model/order');
const { http_response } = require('../../config/http_responses');
const { get_client_info, generate_job_id } = require('./functions');

class Order{
  async get_all_orders(){
    try {
      const orders = await OrderSchema.find().lean(true);
      const orders_with_client_info = await get_client_info(orders);
      return http_response(200, 'Orders info', {orders: orders_with_client_info});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };

  async get_all_active_orders(){
    try {
      const orders = await OrderSchema.find({deleted: false}).lean(true);
      return http_response(200, 'Orders info', {orders});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };

  async get_order_by_id(id){
    try {
      const order = await OrderSchema.findById(id);
      return http_response(200, 'Order info', {order});
    } catch (error) {
      return http_response(500, 'Internal server error in order', {error});
    }
  };

  async get_orders_by_client_name(client_name){
    try {
      const orders = await OrderSchema.find({client_name});
      return http_response(200, 'Order info', {orders});
    } catch (error) {
      return http_response(500, 'Internal server error in order', {error});
    }
  };

  async get_all_active_orders_by_client(client_name){
    try {
      const orders = await OrderSchema.find({client_name, deleted: false});
      return http_response(200, 'Order info', {orders});
    } catch (error) {
      return http_response(500, 'Internal server error in order', {error});
    }
  };

  async create({cad_number, client_name, ...body}, client_id){
    try {
      if(cad_number){
        const cad_number_exits = await OrderSchema.findOne({cad_number});
        if(cad_number_exits){
          return http_response(400, 'Cad number already exists', {error: true});
        };
        body.cad_number = cad_number;
      }
      body.job_id = await generate_job_id(client_name);
      console.log('Body', body)
      const order_to_create = new OrderSchema({...body, client_name});
      const order_created = await order_to_create.save();
      return http_response(200, 'Orders info', {order: order_created});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };

  async edit({deleted, ...body}, id){
    try {
      body.deleted = false;
      body.last_modificated_at = new Date();
      const order_updated = await OrderSchema.findByIdAndUpdate(id, body, {new: true}).lean(true);
      return http_response(200, `Order updated`, {order: order_updated});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };

  async delete(id){
    try {
      const order_deleted = await OrderSchema.findByIdAndUpdate(id, {deleted: true}, {new: true});
      return http_response(200, `Order deleted`, {order: order_deleted});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };
};

module.exports = Order;