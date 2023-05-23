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
  const last_order = orders_by_client?.pop();
  let set_order_number = 1;
  if(last_order){
    set_order_number = get_last_number(last_order) + 1;
  }
  const prepare_clientName = clientName.toLowerCase().replaceAll(' ','');
  const jobId = `${prepare_clientName}-${set_order_number}`;
  return jobId;
};

const get_last_number = ({ jobId }) => {
  const number = parseInt(jobId.split('-')[1]);
  return number;
};

const mark_orders_as_payed = async (orders, paymentType, checkNumber) => {
  return await Promise.all(
    orders.map( async(order) => {
      return await OrderSchema.findByIdAndUpdate(order._id, {paymentDate: new Date(), payed: true, paymentType, checkNumber});
    })
  );
};

module.exports = {
  get_client_info,
  generate_jobId,
  mark_orders_as_payed,
};