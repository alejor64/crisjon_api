const ClientSchema = require('../../model/client');
const { http_response } = require('../../config/http_responses');

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

  async create({email, ...rest}){
    try {
      rest.email = email;
      const new_client = new ClientSchema(rest);
      const client_saved = await new_client.save();
      return http_response(201, 'Client created', {client_saved});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async edit(info_to_update, client_id){
    try {
      info_to_update.last_modificated_at = new Date();
      const client_updated = await ClientSchema.findByIdAndUpdate(client_id, info_to_update).lean(true);
      return http_response(201, `Client ${client_updated.name} updated successfully`, {client_saved});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };
};

module.exports = Client;