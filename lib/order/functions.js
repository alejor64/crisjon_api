const OrderSchema = require('../../model/order');
const Client = require('../client/client');
const client = new Client();

const get_client_info = async (array_of_orders) => {
  return await Promise.all(
    array_of_orders.map( async({client_name, ...rest}) => {
      const client_info = await client.get_client_by_name(client_name);
      rest.client_info = {
        name: client_info.client.name,
        id: client_info.client._id
      };
      return rest;
    })
  );
};

const generate_job_id = async (client_name) => {
  const orders_by_client = await OrderSchema.find({client_name});
  const set_order_number = orders_by_client.length + 1;
  const prepare_client_name = client_name.toLowerCase().replaceAll(' ','');
  const job_id = `${prepare_client_name}-${set_order_number}`;
  return job_id;
};

module.exports = {
  get_client_info,
  generate_job_id,
};