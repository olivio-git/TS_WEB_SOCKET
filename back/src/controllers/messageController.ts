import { Request, Response } from "express";
import capsModels from "../db";
import response from "../utils/response";
import ClientError from "../utils/error";
import { io } from "../app";

export const messageSend = async (req: Request, res: Response) => {
  const { text_content, id_room, id_usuario } = req.body;
  console.log(text_content, id_room, id_usuario);
  const findRoom = await capsModels.Room.findOne({
    where: { id_room: id_room },
  });
  if (!findRoom) {
    throw new ClientError("La sala ya no existe!", 404);
  }
  const result = await capsModels.Message.create({
    text_content: text_content,
    state_message: true,
    userId: id_usuario,
    roomId: id_room,
  }); 
  //awdadwad123123123
  await emitEventMessageCreated(id_room); //Emitir evento para actualizar las salas de chat
  response(res, 200, result);
};
export const emitEventMessageCreated = async (idRoom:string) => {
  const room = await capsModels.Room.findAll({
    where: { id_room: idRoom },
    include: [
      {
        model: capsModels.Message,
        include: [
          {
            model: capsModels.User,
            attributes: ["user_name"],
          },
        ],
      },
    ],
  });
  io.emit(idRoom, { MessageChannel: room });
};
export const roomMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rooms = await capsModels.Room.findAll({
    where: {
      id_room: id,
    },
    include: [
      {
        model: capsModels.Message,
        include: [
          {
            model: capsModels.User,
            attributes: ["user_name"],
          },
        ],
        attributes: [
          "id_message",
          "text_content",
          "state_message",
          "createdAt",
          "updatedAt",
          "userId",
          "roomId",
          "User.user_name",
        ],
      },
    ],
  }); 
  response(res, 200, rooms);
};
