const Client = require('../client/client');
const client = new Client();

const get_client_info = async (array_of_orders) => {
  return await Promise.all(
    array_of_orders.map( async({client_id, ...rest}) => {
      const client_info = await client.get_client_by_id(client_id);
      rest.client_info = {
        name: client_info.client.name,
        id: client_info.client._id
      };
      return rest;
    })
  );
};

module.exports = {
  get_client_info
};