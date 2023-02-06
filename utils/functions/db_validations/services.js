const OrderServiceSchema = require('../../../model/orderService');

const serviceByName = async (name = '') => {
  const orderService = await OrderServiceSchema.findOne({name});
  if(orderService) throw new Error(`The service ${name} already exists`);
};

const serviceById = async (id) => {
  const orderServiceInDB = await OrderServiceSchema.findById(id);
  if(!orderServiceInDB) throw new Error(`The service with id ${id} does not exist`);
}

module.exports = {
  serviceByName,
  serviceById,
}