const OrderSchema = require('../../model/order');
const Client = require('../client/client');
const client = new Client();

const get_client_info = async (array_of_orders) => {
  return await Promise.all(
    array_of_orders.map( async({clientName, ...rest}) => {
      const client_info = await client.get_client_by_name(clientName);
      rest.client_info = {
        name: client_info.client.name,
        id: client_info.client._id
      };
      return rest;
    })
  );
};

const generate_jobId = async (clientName) => {
  const orders_by_client = await OrderSchema.find({clientName});
  const set_order_number = orders_by_client.length + 1;
  const prepare_clientName = clientName.toLowerCase().replaceAll(' ','');
  const jobId = `${prepare_clientName}-${set_order_number}`;
  return jobId;
};

module.exports = {
  get_client_info,
  generate_jobId,
};