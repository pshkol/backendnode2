const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use('/app/user', user);
app.use('/app/login', auth);

app.use(errors);

app.listen(config.api.port, function () {
  console.log(`Escuchando en el puerto ${config.api.port}`);
});
