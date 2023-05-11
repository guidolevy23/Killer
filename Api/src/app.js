const express = require("express");
const morgan = require("morgan");
const routes = require('./Routes/index.js')
const cookieParser = require('cookie-parser')

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // ACHEQUEAR ESTO
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
//   });

server.use("/", routes);

module.exports = server;