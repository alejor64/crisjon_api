const OrderItemSchema = require('../../../model/orderItems');

const itemByName = async (name = '') => {
  const orderitem = await OrderItemSchema.findOne({name});
  if(orderitem) throw new Error(`The item ${name} already exists`);
};

const itemById = async (id) => {
  const orderitemInDB = await OrderItemSchema.findById(id);
  if(!orderitemInDB) throw new Error(`The item with id ${id} does not exist`);
}

module.exports = {
  itemByName,
  itemById,
}