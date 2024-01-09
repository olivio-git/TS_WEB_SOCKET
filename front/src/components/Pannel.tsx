import { useContext, useEffect, useState } from "react";
import ModalRoomCreate from "./ModalRoomCreate";
import { socket } from "../web/socket";
import CardSala from "./CardSala";
import DataContext from "../context/dataContext";
import axios from "axios";

interface Props {
  user: string;
}
export default function Pannel(props: Props) {
  //context
  const { rooms, handleUpdateRooms } = useContext(DataContext);
  const [modalRoom, setModalRoom] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  
  useEffect(() => {
    setShowModal(modalRoom);
  }, [modalRoom]); 
  useEffect(() => {  
    console.log("first")
    socket.on("roomUpdate", (message) => {
      if (message) {
        handleUpdateRooms(message.MessageChannel);
      }
    });
    return () => {
      socket.off("roomUpdate");
    };
  }, []);
  return (
    <div className="flex flex-col items-center w-3/12 h-screen">
      <header className="w-full bg-[#233142] h-24 p-4">
        <h1 className="font-sans font-bold text-white">{props.user}</h1>
      </header>
      <main className="w-full bg-[#ececec] flex-grow">
        <section className="w-full flex flex-row justify-center items-center p-2 h-12 border-b-2 border-black text-center">
          <p className="font-bold text-gray-500">Salas</p>
          <button
            onClick={() => setModalRoom(true)}
            className="h-8 w-8 rounded-full hover:bg-green-300">
            <svg
              fill="gray"
              id="Layer_1"
              height="30"
              viewBox="0 0 24 24"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1">
              <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z" />
            </svg>
          </button>
        </section>
        <section className="flex flex-col w-full flex-grow p-4 gap-2">
          {rooms &&
            rooms.map((room, index) => {
              return (
                <CardSala
                  key={room.id_room}
                  room_name={room.room_name}
                  room={room}
                  ></CardSala>
              );
            })}
        </section>
      </main>
      {showModal ? (
        <ModalRoomCreate handleChangeRoom={setModalRoom}></ModalRoomCreate>
      ) : null}
    </div>
  );
}
