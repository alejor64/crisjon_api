const ClientSchema = require('../../model/client');
const { http_response } = require('../../config/http_responses');
const { prepare_phone } = require('../../utils/functions/common');

class Client{
  async get_all_clients(){
    try {
      const clients = await ClientSchema.find().lean(true);
      return http_response(200, 'Clients info', {clients});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async get_client_by_id(id){
    try {
      const client = await ClientSchema.findById(id).lean(true);
      return http_response(200, 'Client info', {client});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async get_client_by_name(name){
    try {
      const client = await ClientSchema.findOne({name}).lean(true);
      return http_response(200, 'Client info', {client});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async create({phone, ...rest}){
    try {
      rest.phone = prepare_phone(phone);
      const new_client = new ClientSchema(rest);
      const client_saved = await new_client.save();
      return http_response(201, 'Client created', {client: client_saved});
    } catch (error) {
      console.log('error', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async edit(info_to_update, clientId){
    try {
      info_to_update.lastModificatedAt = new Date();
      const client_updated = await ClientSchema.findByIdAndUpdate(clientId, info_to_update, {new: true}).lean(true);
      return http_response(200, `Client ${client_updated.name} updated successfully`, {client: client_updated});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };
};

module.exports = Client;