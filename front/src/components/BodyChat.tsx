import { useContext, useEffect, useState } from "react";
import { BodyChatProps } from "../interfaces/Interfaces";
import DataContext from "../context/dataContext";
import axios from "axios";
import FormSubmit from "./Form";
import ModalLoader from "./modalSpinner";
import ModalStream from "./ModalStream";
import ButtonSend from "./Button";

export const BodyChat: React.FC<BodyChatProps> = ({
  selectedRoom,
  messages,
}) => {
  const { userLogin } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const [modalSpinner, setModalSpinner] = useState<Boolean>(false);
  const [modalStream, setModalStream] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setModalSpinner(true);
      const response = await axios.post("http://localhost:3001/api/message/", {
        text_content: message,
        id_room: selectedRoom.id_room,
        id_usuario: userLogin.user.id_user,
      });
      setModalSpinner(false);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeModalStream = () => {
    setModalStream(!modalStream);
  }
  const transformDate = (date: string) => {
    let now = new Date().getTime();
    let dateSt = new Date(date).getTime();
    let seconds = Math.round((now - dateSt) / 1000);

    if (seconds < 60) {
      return "hace unos segundos";
    } else if (seconds < 3600) {
      return "hace " + Math.floor(seconds / 60) + " minutos";
    } else if (seconds < 86400) {
      return "hace " + Math.floor(seconds / 3600) + " horas";
    } else {
      return "hace " + Math.floor(seconds / 86400) + " días";
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="w-full flex flex-col pt-4 gap-1  px-1">
      <header className="flex w-full flex-row  h-24 bg-[#F1F2F7] p-8 text-white rounded-s-[10px] rounded-e-[10px] shadow">
        <div className="w-2/6 flex tems-center h-12">
          <h5 className="text-gray-600 font-bold">{selectedRoom.room_name}</h5>
        </div>
        <div className="w-4/6 flex justify-end pr-8">
          <ButtonSend onClick={handleChangeModalStream} className="flex items-center justify-center p-2 hover:bg-[#8ef6e4] hover:bg-opacity-50 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="25"
              height="25">
              <path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" />
            </svg>
          </ButtonSend>
          <button className="flex items-center justify-center p-2 hover:bg-[#8ef6e4] hover:bg-opacity-50 rounded-full">
            <svg
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="23"
              height="23">
              <circle cx="12" cy="2" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="22" r="2" />
            </svg>
          </button>
        </div>
      </header>
      <main
        className="w-full flex flex-col p-8 flex-grow gap-2 bg-[#F5F6FA]
       overflow-y-auto min-h-[calc(80vh-50px)] max-h-[calc(80vh-50px)]">
        {messages.map((message) => {
          return (
            <div
              key={message.id_message}
              className={`${
                message.userId == userLogin.user.id_user
                  ? "self-end text-white bg-[#2680EB]"
                  : "self-start bg-[#ffff]  text-gray-500"
              } max-w-96 p-2  rounded-lg shadow hover:cursor-pointer mb-2 shadow-lg`}>
              <section className="flex  justify-between w-full">
                <h5 className="text-sm">
                  {userLogin.user.id_user == message.userId
                    ? "tú"
                    : message.User.user_name}
                </h5>
                <button className="hover:bg-gray-200 hover:bg-opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill={`${
                      message.userId == userLogin.user.id_user
                        ? "white"
                        : "gray"
                    }`}>
                    <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
                  </svg>
                </button>
              </section>
              <h5 className="text-xl font-bold tracking-tight ">
                {message.text_content}
              </h5>
              <h5 className="text-sm">{transformDate(message.createdAt)}</h5>
            </div>
          );
        })}
      </main>
      <footer className="flex items-center pl-8 pr-8">
        <FormSubmit
          className="flex items-center p-2 rounded-s-[25px] rounded-e-[25px] flex-grow bg-[#ffff] shadow"
          onSubmit={handleSubmit}>
          <input
            name="message"
            type="text"
            value={message}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-full p-2"
            placeholder="Escribe tu mensaje..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2">
            Enviar
          </button>
        </FormSubmit>
      </footer>
      {modalSpinner ? (
        <ModalLoader text="Enviando mensaje..."></ModalLoader>
      ) : null}
      {
        modalStream?<ModalStream idRoom={selectedRoom.id_room} handleChangeModalStream={handleChangeModalStream}></ModalStream>:null
      }
    </div>
  );
};
