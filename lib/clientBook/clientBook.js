const ClientBookSchema = require('../../model/clientBook');
const { http_response } = require('../../config/http_responses');
const { prepare_phone } = require('../../utils/functions/common');

class ClientBook {
  async get_all_clients(){
    try {
      const clients = await ClientBookSchema.find().sort({name: 1}).lean(true);
      return http_response(200, 'Clients book info', {clients});
    } catch (error) {
      console.log('Error in get all clients book', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async get_client_by_id(id){
    try {
      const client = await ClientBookSchema.findById(id).lean(true);
      return http_response(200, 'Client book info', {client});
    } catch (error) {
      console.log('Error in get client book by id', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async create({phone, ...rest}){
    try {
      rest.phone = prepare_phone(phone);
      const new_client = new ClientBookSchema(rest);
      const client_saved = await new_client.save();
      return http_response(201, 'Client book created', {client: client_saved});
    } catch (error) {
      console.log('Error in create client book', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async edit(info_to_update, id){
    try {
      info_to_update.lastModificatedAt = new Date();
      const client_updated = await ClientBookSchema.findByIdAndUpdate(id, info_to_update, {new: true}).lean(true);
      return http_response(200, `Client ${client_updated.name} updated successfully`, {client: client_updated});
    } catch (error) {
      console.log('Error in edit client book', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async deleteById(id){
    try {
      const client_deleted = await ClientBookSchema.findByIdAndDelete(id).lean(true);
      return http_response(200, `Client ${client_deleted.name} deleted successfully`, {client: client_deleted});
    } catch (error) {
      console.log('Error in delete client book by id', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

};

module.exports = ClientBook;