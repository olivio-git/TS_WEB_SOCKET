import { NextFunction, Request } from "express";
import { server, io } from "./src/app";
import { conn } from "./src/db";
import ClientError from "./src/utils/error";

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("server running at http://localhost:3001");
  });
});
