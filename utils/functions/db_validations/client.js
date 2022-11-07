const ClientSchema = require('../../../model/client');

const client_by_name = async (name = '') => {
  const client = await ClientSchema.findOne({name});
  if(client) throw new Error(`The client ${name} already exists`);
};

const client_by_id = async (id = '') => {
  const client = await ClientSchema.findById(id);
  if(!client){
    throw new Error(`The client ${id} does not exist`);
  };
};

module.exports = {
  client_by_name,
  client_by_id
};