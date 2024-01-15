import { Request, Response } from "express";
import capsModels from "../db";
import response from "../utils/response";
import ClientError from "../utils/error";
import { io } from "../app";

export const postRoomController = async (req: Request, res: Response) => {
  const room = req.body;
  const result = await capsModels.Room.create(room);
  if (!result) {
    throw new ClientError("No se pudo completar la creación!.", 401);
  }
  const findRooms = await findAllRooms();
  io.emit("roomUpdate", { MessageChannel: findRooms });
  response(res, 200, { MessageChannel: "Creación exitosa!.", room: result });
};

export const getRoomsController = async (req: Request, res: Response) => {
  const result = await findAllRooms();
  if (!result) {
    throw new ClientError("No se encontró salas!.", 401);
  }
  response(res, 200, { MessageChannel: "Salas!.", room: result });
};

const findAllRooms = async () => {
  const result = await capsModels.Room.findAll();
  return result;
};
export const getRoomMessageController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await capsModels.Room.findAll({
    where: { id_room: id },
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
  if (!result) {
    throw new ClientError("No se encontró mensajes!.", 401);
  };
  response(res, 200, { MessageChannel: result });
};
