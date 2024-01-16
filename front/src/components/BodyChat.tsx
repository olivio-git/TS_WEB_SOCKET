import { useContext, useEffect, useState } from "react";
import { BodyChatProps } from "../interfaces/Interfaces";
import DataContext from "../context/dataContext";
import axios from "axios";
import FormSubmit from "./Form";
import ModalLoader from "./modalSpinner";
import { formatDistanceToNow } from "date-fns";

export const BodyChat: React.FC<BodyChatProps> = ({
  selectedRoom,
  messages,
}) => {
  const { userLogin } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const [modalSpinner, setModalSpinner] = useState<Boolean>(false);
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
      <header className="w-full h-24 bg-[#F1F2F7] p-8 text-white rounded-s-[10px] rounded-e-[10px] shadow">
        {selectedRoom.room_name}
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
                    fill={`${ message.userId == userLogin.user.id_user?'white':'gray'}`}
                    >
                    <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
                  </svg>
                </button>
              </section>
              <h5 className="text-xl font-bold tracking-tight ">
                {message.text_content}
              </h5>
              <h5 className="text-sm">
                {transformDate(message.createdAt)}
              </h5>
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
    </div>
  );
};
