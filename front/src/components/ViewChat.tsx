import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/dataContext";
import axios from "axios";
import { BodyChatProps, Message } from "../interfaces/Interfaces";
import FormSubmit from "./Form";
import ModalLoader from "./modalSpinner";
import { socket } from "../web/socket";
import { BodyLogo } from "./BodyLogo";
import { BodyChat } from "./BodyChat";

export default function ViewChat() {
  const { selectedRoom } = useContext(DataContext);
  const [loader, setLoader] = useState<Boolean>(false);
  const [messages, handleSetMessages] = useState<Message[]>([]);
  const updateChatsRoomSelected = async () => {
    setLoader(true);
    try {
      setTimeout(async () => {
        const { data } = await axios.get(
          `http://localhost:3001/api/room/messages/${selectedRoom.id_room}`
        );
        handleSetMessages(data.data.MessageChannel[0].Messages);
        setLoader(false);
      }, 500);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    socket.on(selectedRoom.id_room, (message) => {
      if (message) {
        handleSetMessages(message.MessageChannel[0].Messages);
      }
    });
    return () => {
      socket.off(selectedRoom.id_room);
    };
  }, []);
  useEffect(() => {
    if (selectedRoom.id_room) updateChatsRoomSelected();
  }, []);

  return (
    <div className="flex flex-col  items-center w-9/12 h-screen bg-[#F5F6FA]">
      {selectedRoom.id_room ? (
        <BodyChat selectedRoom={selectedRoom} messages={messages}></BodyChat>
      ) : (
        <BodyLogo></BodyLogo>
      )}
      {loader ? <ModalLoader text="Cargando mensajes..." ></ModalLoader> : null}
    </div>
  );
}



