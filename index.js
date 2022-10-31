const express = require('express');
const app = express();
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/index');
const user_api = require('./api/user/user');
const client_api = require('./api/client/client');
let mongo_uri = `mongodb+srv://${config.mongo_user}:${config.mongo_password}@cluster0.${config.mongo_keyword}.mongodb.net/${config.mongo_db}`;
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cors());
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use('/user', user_api);
app.use('/client', client_api);

app.get('/', (req, res) => {
  return res.status(200).json({
    data: 'CRISJON API',
    msn: 'OK'
  });
});

mongoose.connect(mongo_uri, options, () => {
  console.log('[DB] Conection Successful');
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
})