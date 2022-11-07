const OrderSchema = require('../../../model/order');

const order_by_id = async(id = '') => {
  const order = await OrderSchema.findById(id);
  if(!order) throw new Error(`The order ${id} does not exist`);
};

const order_by_name = async (name = '') => {
  const order = await OrderSchema.findOne(name);
  if(order) throw new Error(`The order ${name} already exist`);
}

module.exports = {
  order_by_id,
  order_by_name,
}