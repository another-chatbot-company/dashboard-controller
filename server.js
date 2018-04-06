const http  = require('http');

const app = require('./app');
const env = require('dotEnv').config();

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port);

