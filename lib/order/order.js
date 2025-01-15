const moment = require('moment');
const OrderSchema = require('../../model/order');
const { http_response } = require('../../config/http_responses');
const { generate_jobId } = require('./functions');

class Order{
  async get_all_orders(){
    try {
      const orders = await OrderSchema.find().sort({createdAt: -1}).lean(true);
      return http_response(200, 'Orders info', {orders});
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

  async get_orders_by_clientName(clientName){
    try {
      const orders = await OrderSchema.find({clientName}).sort({createdAt: -1}).limit(100);
      return http_response(200, 'Order info', {orders});
    } catch (error) {
      return http_response(500, 'Internal server error in order', {error});
    }
  };

  async get_all_active_orders_by_client(clientName){
    try {
      const orders = await OrderSchema.find({clientName, deleted: false});
      return http_response(200, 'Order info', {orders});
    } catch (error) {
      return http_response(500, 'Internal server error in order', {error});
    }
  };

  async get_orders_by_client_and_date(clientName, startDate, endDate) {
    try {
      const startDay = moment(startDate).startOf('day');
      const endDay = moment(endDate).endOf('day');
      const orders = await OrderSchema.find({
        clientName,
        deliveredDate: {$gte: startDay, $lte: endDay},
        payed: false,
        $or: [
          { invoice: { $exists: false } },
          { invoice: { $eq: null } },
        ],
        price: { $exists: true, $ne: null, $ne: '' }
      });
      return http_response(200, 'Order info', {orders});
    } catch (error) {
      console.log('Error in get invoice by client and date', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async create({cadNumber, ...body}){
    try {
      if(cadNumber){
        const cadNumber_exits = await OrderSchema.findOne({cadNumber});
        if(cadNumber_exits){
          return http_response(400, 'Cad number already exists', {error: true});
        };
        body.cadNumber = cadNumber;
      }
      body.jobId = await generate_jobId(body.clientName);
      body.name = body.jobId;
      const order_to_create = new OrderSchema({...body});
      const order_created = await order_to_create.save();
      return http_response(200, 'Orders info', {order: order_created});
    } catch (error) {
      console.log('Error in create Order', error)
      return http_response(500, 'Internal error in order', {error: true});
    }
  };

  async edit(body, id){
    try {
      body.deleted = false;
      if(body.dueDate) body.dueDate = moment(body.dueDate);
      if(body.deliveredDate) body.deliveredDate = moment(body.deliveredDate);
      if(body.paymentDate) body.paymentDate = moment(body.paymentDate);
      if(body.price) body.price = parseFloat(body.price);
      body.lastModificatedAt = new Date();
      const order_updated = await OrderSchema.findByIdAndUpdate(id, body, {new: true}).lean(true);
      return http_response(200, `Order updated`, {order: order_updated});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };

  async delete(id){
    try {
      const order_deleted = await OrderSchema.findByIdAndDelete(id);
      return http_response(200, `Order deleted ${order_deleted.clientJobName || order_deleted.name}`, {order: order_deleted});
    } catch (error) {
      return http_response(500, 'Internal error in order', {error: true});
    }
  };
};

module.exports = Order;