const OrderSchema = require('../../model/order');

const get_order_info_to_invoice = async(ordersPayed) => {
  return await Promise.all(
    ordersPayed.map( async(orderId) => {
      const order = await OrderSchema.findById(orderId).lean(true);
      return order;
    })
  );
}

module.exports = {
  get_order_info_to_invoice,
};