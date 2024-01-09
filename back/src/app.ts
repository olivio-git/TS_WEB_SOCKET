import router from "./routes/index";
import morgan from "morgan";
import cors from "cors";
import { Message } from "./interface/MessageInterface";
import ClientError from "./utils/error";
import { NextFunction, Request, Response } from "express";
import express from "express";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // reemplaza esto con el origen de tu frontend
  credentials: true
 }));
app.disable('x-powered-by'); //para desactivar el header de express by
app.use(morgan("dev")); //para poder ver en consola las solicitudes
app.use(express.json()); //para poder recibir json por body
app.use(cookieParser()); //para las cookies
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(bodyParser.json({limit:"50mb"}));
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","http://localhost:5173");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("Access-Control-Allow-Headers","Origin,X-Request-With, Content-Type,Accept,Authorization");
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
  //res.header("Creator","");
  const now=new Date();  
  res.header("Server-Time",now.toDateString());
  next();
})
app.use("/api", router); //mi arbol de rutas
app.get("/", (__: Request, res: Response) => {
  (res as any).status(200).send("<h1>Welcome to the chat_message web api</h1>");
});

app.use((err: ClientError, _: Request, res: Response, __: NextFunction) => {
  const { statusCode, message } = err;
  const code = typeof statusCode === "number" ? statusCode : 401;
  res.status(code).json({
    error: true,
    message: message,
  });
});
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  socket.emit("validConnection", true);
  socket.on("message", (arg: Message) => {
    console.log(arg);
    socket.emit("message", arg);
  });
});

export { server, io, app };
