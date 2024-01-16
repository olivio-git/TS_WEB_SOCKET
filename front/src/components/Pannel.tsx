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
  
  return (
    <div className="flex flex-col items-center w-3/12 h-screen">
      <header className="flex w-full bg-[#F5F6FA] h-24 p-4 items-center">
        <section className="flex flex-row">
          <div className="flex bg-[#8ef6e4] justify-center items-center w-12 h-flex-grow rounded-full text-2xl font-bold text-[#f70776]">
            {props.user[0].toUpperCase()+props.user[1].toLocaleUpperCase()}
          </div>
          <div>
            <h1 className="font-semibold text-gray-700 text-lg">
              {props.user}
            </h1>
            <p className="text-gray-500 text-sm">@developer</p>
          </div>
        </section>
      </header>
      <main className="flex flex-col gap-2 w-full bg-[#F5F6FA] flex-grow p-4">
        <section className="w-full flex flex-row justify-center items-center p-2 h-12 text-center">
          <button
            onClick={() => setModalRoom(true)}
            className="h-8 w-24 rounded-full hover:bg-blue-400 hover:text-white bg-blue-500 text-gray-200 font-bold">
            Crear sala
          </button>
        </section>
        <section className="flex  flex-col w-full flex-grow rounded-s-[25px] rounded-e-[25px] bg-[#FFFFFF]">
          <div className="flex items-center bg-[#F5F6FA] rounded-full px-2 m-2">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow font-bold font-gray-200 outline-none h-12 bg-[#F5F6FA] rounded-full pl-4"
            />
            <button className="ml-2 pr-4">
              <svg
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="20"
                height="20">
                <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
              </svg>
            </button>
          </div>
          {rooms &&
            rooms.map((room, index) => {
              return (
                <CardSala
                  key={room.id_room}
                  room_name={room.room_name}
                  room={room}></CardSala>
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
