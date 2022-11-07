const Client = require('../client/client');
const Order = require('../order/order');
const client = new Client();
const order = new Order();

const get_client_and_order_info = async (ep_info) => {
  const {order_id, client_id, ...rest} = ep_info;
  const {order: order_info} = await order.get_order_by_id(order_id);
  const {client: client_info} = await client.get_client_by_id(client_id);
  rest.order = {
    id: order_id,
    name: order_info.name,
    client_job_name: order_info.client_job_name,
    service: order_info.service,
    description: order_info.description,
  };
  rest.client = {
    id: client_id,
    name: client_info.name,
    address: client_info.address,
    fein: client_info.fein,
    phone: client_info.phone,
  };
  return rest;
};

const complete_ep_info = async (array_ep) => {
  return await Promise.all(
    array_ep.map( async(estimated_price) => {
      return await get_client_and_order_info(estimated_price);
    })
  );
};

module.exports = {
  get_client_and_order_info,
  complete_ep_info,
};