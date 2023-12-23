import express from 'express';
import router from './routes/index';
import morgan from 'morgan';
const server = express();

server.use("/api", router);
server.use(morgan('dev'));
export default server;
