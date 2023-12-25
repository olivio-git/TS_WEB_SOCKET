import express from 'express';
import router from './routes/index';
import morgan from 'morgan';
import cors from 'cors';
const server = express();

server.use("/api", router);
server.use(morgan('dev'));
server.use(cors());
export default server;
