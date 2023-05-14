const Client = require('../client/client');
const client = new Client();

const get_client_and_order_info = async (epInfo) => {
  const {clientId, ...rest} = epInfo;
  const {client: clientInfo} = await client.get_client_by_id(clientId);
  rest.clientName = clientInfo.name
  return rest;
};

const complete_ep_info = async (arrayEp) => {
  return await Promise.all(
    arrayEp.map( async(estimatedPrice) => {
      return await get_client_and_order_info(estimatedPrice);
    })
  );
};

module.exports = {
  get_client_and_order_info,
  complete_ep_info,
};