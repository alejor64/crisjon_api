const express = require('express');
const app = express();
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const config = require('./config/index');
const user_api = require('./api/user/user');
const client_api = require('./api/client/client');
const client_book_api = require('./api/clientBook/clientBook');
const order_api = require('./api/order/order');
const estimate_api = require('./api/estimate/estimate');
const token_api = require('./api/token/token');
const serviceApi = require('./api/order/services/services');
const itemApi = require('./api/order/items/items');
const invoiceApi = require('./api/invoice/invoice');
const metalsPriceApi = require('./api/metalsPrice/metalsPrice');
let mongo_uri = `mongodb+srv://${config.mongo_user}:${config.mongo_password}@${config.mongo_cluster}.${config.mongo_keyword}.mongodb.net/${config.mongo_db}`;
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cors());
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use('/user', user_api);
app.use('/client', client_api);
app.use('/client-book', client_book_api);
app.use('/order', order_api);
app.use('/order-services', serviceApi);
app.use('/order-items', itemApi);
app.use('/estimate', estimate_api);
app.use('/metals-price', metalsPriceApi);
app.use('/invoice', invoiceApi);
app.use('/token', token_api);

app.get('/', (req, res) => {
  return res.status(200).json({
    data: 'CRISJON API',
    msn: 'OK'
  });
});

cron.schedule('30 12 * * *', async() => {
  await axios.get(`${config.url_prod}/metals-price/get-metals-price`);
})

mongoose.connect(mongo_uri, options, (error) => {
  if(error) {
    console.log('Error connecting to MongoDB', error)
  }else {
    console.log('[DB] Conection Successful now');
  };
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});