const Client = require('../client/client');
const Order = require('../order/order');
const client = new Client();
const order = new Order();

const get_client_and_order_info = async (ep_info) => {
  const {orderId, clientId, ...rest} = ep_info;
  const {order: order_info} = await order.get_order_by_id(orderId);
  const {client: client_info} = await client.get_client_by_id(clientId);
  rest.order = {
    id: orderId,
    name: order_info.name,
    clientJobName: order_info.clientJobName,
    service: order_info.service,
    description: order_info.description,
  };
  rest.client = {
    id: clientId,
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