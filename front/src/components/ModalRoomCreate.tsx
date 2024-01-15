import React, { useState } from "react";
import { HandleChangeRoom, Room } from "../interfaces/Interfaces";
import ButtonTrianglePromise from "./ButtonTrianglePromise";
import ButtonSend from "./Button";
import ErrorComponent from "./ErrorComponent";
import axios from "axios";
import toast from "react-hot-toast";
import InputText from "./InputText";

export default function ModalRoomCreate({
  handleChangeRoom,
}: HandleChangeRoom) {
  const [statePromise, setStatePromise] = useState(false);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState<Room>({
    room_name: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({
      ...room,
      room_name: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatePromise(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/room/",
        room
      );
      setStatePromise(false);
      toast.success(response.data.data.MessageChannel);
      handleChangeRoom(false);
    } catch (error: any) {
      setStatePromise(false);
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative sm:w-auto md:w-auto lg:w-3/12 xl:w-3/12 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Crear sala</h3>
              <button
                className="rounded-full p-2 ml-auto bg-[#f70776] border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleChangeRoom(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20">
                  <g id="_01_align_center" data-name="01 align center">
                    <polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414" />
                  </g>
                </svg>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="user_name">
                    Nombre de sala
                  </label>
                  <InputText
                    name="room_name"
                    value={room.room_name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="user_name"
                    type="text"
                    placeholder="Nombre de sala"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {statePromise ? (
                    <ButtonTrianglePromise></ButtonTrianglePromise>
                  ) : (
                    <ButtonSend
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit">
                      Crear
                    </ButtonSend>
                  )}
                </div>
              </form>
              {error && (
                <ErrorComponent strong="Error" span={error}></ErrorComponent>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleChangeRoom(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
