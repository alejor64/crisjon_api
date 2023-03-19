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

const client_by_name_exits = async (name = '') => {
  const client = await ClientSchema.findOne({name});
  if(!client) throw new Error(`The client ${name} does not exists`);
};

module.exports = {
  client_by_name,
  client_by_id,
  client_by_name_exits,
};